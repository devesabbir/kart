import UserModel from "@/models/user-model";
import {
  addToWishList,
  getAllWishList,
  removeFromWishList,
} from "@/queries/shop-queries";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("useremail");

  if (!query) {
    return Response.json({
      status: 404,
      message: "Invalid query",
    });
  }

  try {
    const user = await UserModel.findOne({ email: query });
    if (!user) {
      return Response.json({
        status: 404,
        message: "Authentication failed",
      });
    }

    const wishlist = await getAllWishList(user?._id);

    return Response.json({
      status: 200,
      data: wishlist,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      error: error,
    });
  }
}

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const userEmail = searchParams.get("useremail");
  const action = searchParams.get("action");
  const { productId } = await request.json();

  console.log(userEmail, action, productId);

  try {
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return Response.json({
        status: 404,
        message: "Authentication failed!",
      });
    }

    if (action === "delete") {
      const res = await removeFromWishList(user?._id, productId);
      return Response.json({
        status: 200,
        data: res,
      });
    }

    const res = await addToWishList(user?._id, productId);

    return Response.json({
      status: 200,
      data: res,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      error: error,
    });
  }
}
