import connectDB from "@/lib/db";
import CartModel from "@/models/cart-model";

import ProductModel from "@/models/product-model";
import UserModel from "@/models/user-model";
import WishlistModel from "@/models/wishlist-model";
import { replaceMongoIdFromArray, replaceMongoIdFromObj } from "@/utils/utils";
import { ObjectId } from "mongodb";

/**
 *
 * @param {*} queryParams
 * @returns allProducts including query parameters
 */

async function getAllProducts(queryParams) {
  try {
    await connectDB();

    const query = {};

    if (queryParams?.q) {
      const regex = new RegExp(queryParams?.q, "i");
      query.name = { $regex: regex };
    }

    // Filter by category (split on pipe symbol)
    if (queryParams?.category) {
      const arry = queryParams?.category
        ?.split("|")
        ?.map((item) => new RegExp(item, "i"));
      query.category = { $in: arry };
    }

    // Filter by price range (assuming price is a number in your schema)
    if (queryParams?.minprice) {
      query.price = { $gte: parseInt(queryParams?.minprice) }; // Greater than or equal to min price
    }

    if (queryParams?.maxprice) {
      query.price = { ...query?.price, $lte: parseInt(queryParams?.maxprice) }; // Less than or equal to max price (merge with existing price filter if any)
    }

    // Filter by size (assuming size is a string field in your schema)
    if (queryParams?.size) {
      query.sizes = { $in: queryParams?.size };
    }

    let products;

    if (!queryParams) {
      products = await ProductModel.find()
        .select([
          "name",
          "images",
          "price",
          "discount_price",
          "reviewsNumber",
          "ratings",
        ])
        .lean();
    } else {
      products = await ProductModel.find(query)
        .select([
          "name",
          "images",
          "price",
          "discount_price",
          "reviewsNumber",
          "ratings",
        ])
        .lean();
    }

    return replaceMongoIdFromArray(products);
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {*} id
 * @returns Single Product By Product ID
 */
async function getSingleProduct(id) {
  try {
    await connectDB();
    if (id) {
      const product = await ProductModel.findById(id).lean();

      return product;
    }
  } catch (error) {
    throw error;
  }
}

async function getCarts(userEmail) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail }).lean();
    if (user) {
      const cart = await CartModel.findOne({ userId: user._id })
        .populate("userId", "name email")
        .populate("items.productId")
        .lean();

      return { ...cart, count: cart?.items?.length };
    }
  } catch (error) {
    throw error;
  }
}
/**
 *
 * @param {*} userEmail
 * @param {*} productId
 * @param {*} qty
 * @returns UpdatedCart array
 */

async function addToCart(userEmail, productId, qty = 1) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail }).lean();
    let cart = await CartModel.findOne({ userId: user._id });

    if (!cart) {
      cart = new CartModel({
        userId: user._id,
        items: [],
      });
    }

    const productIndex = cart?.items?.findIndex(
      (item) => item.productId.toString() === new ObjectId(productId).toString()
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += Number(qty);
    } else {
      cart.items.push({ productId: productId, quantity: Number(qty) });
    }

    const res = await cart.save();

    if (res) {
      const resCart = await CartModel.findOne({ userId: res.userId })
        .populate("userId", "name email")
        .populate("items.productId")
        .lean();
      return { ...resCart, count: resCart?.items?.length };
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {*} userEmail
 * @param {*} productId
 * @returns Updated cart array
 */

async function decrementCartItem(userEmail, productId) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail }).lean();
    let cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      throw new Error("Cart not found");
    }
    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      throw new Error("Product not found in cart");
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    }

    const res = await cart.save();

    if (res) {
      const resCart = await CartModel.findOne({ userId: res.userId })
        .populate("userId", "name email")
        .populate("items.productId")
        .lean();
      return { ...resCart, count: resCart?.items?.length };
    }
  } catch (error) {}
}

/**
 *
 * @param {*} userEmail
 * @param {*} productId
 * @returns updated cart array
 */
async function removeFromCart(userEmail, productId) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail }).lean();
    let cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      throw new Error("Cart not found");
    }
    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.items.splice(itemIndex, 1);

    const res = await cart.save();

    if (res) {
      const resCart = await CartModel.findOne({ userId: res.userId })
        .populate("userId", "name email")
        .populate("items.productId")
        .lean();
      return { ...resCart, count: resCart?.items?.length };
    }
  } catch (error) {}
}

async function getAllWishList(userId) {
  try {
    await connectDB();
    const wishList = await WishlistModel.findOne({ userId: userId })
      .populate("userId", "name email -_id")
      .populate("items")
      .lean();

    if (!wishList) {
      throw new Error("There was an error!");
    }

    return { ...wishList, count: wishList?.items?.length || 0 };
  } catch (error) {
    console.log(error);
  }
}

async function addToWishList(userId, productId) {
  try {
    await connectDB();
    let wishList = await WishlistModel.findOne({ userId: userId });
    if (!wishList) {
      wishList = new WishlistModel({
        userId: userId,
        items: [],
      });
    }
    const findeIndex = wishList.items.findIndex(
      (item) => item.toString() === productId.toString()
    );

    if (findeIndex > -1) {
      return "Already in wish list";
    }

    wishList.items.push(productId);
    const res = await wishList.save();

    if (res) {
      const wishList = await WishlistModel.findOne({ userId: userId })
        .populate("userId", "name email -_id")
        .populate("items")
        .lean();
      return { ...wishList, count: wishList?.items?.length || 0 };
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeFromWishList(userId, productId) {
  try {
    await connectDB();
    let wishList = await WishlistModel.findOne({ userId: userId });

    const itemIndex = wishList.items.findIndex(
      (item) => item.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      throw new Error("Product not found in WishList");
    }

    wishList.items.splice(itemIndex, 1);

    const res = await wishList.save();

    if (res) {
      const wishList = await WishlistModel.findOne({ userId: userId })
        .populate("userId", "name email -_id")
        .populate("items")
        .lean();
      return { ...wishList, count: wishList?.items?.length || 0 };
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllProducts,
  getSingleProduct,
  getCarts,
  addToCart,
  decrementCartItem,
  removeFromCart,
  getAllWishList,
  addToWishList,
  removeFromWishList,
};
