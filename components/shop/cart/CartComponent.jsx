"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

function CartComponent() {
  const { cart } = useCart();
  const { items } = cart || [];

  const context = useCart();

  const handleDecrementFromCart = (productId) => {
    if (productId) {
      context.decrementCartItem(productId);
    }
  };

  const handleIncrement = (productId, qty) => {
    if (productId) {
      const newItem = {
        productId: productId,
        qty: qty,
      };
      context.addToCart(newItem);
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (productId) {
      context.removeFromCart(productId);
      toast.error("Remove from cart");
    }
  };

  const totalPriceByProduct = () => {
    return items
      ?.reduce((acc, product) => {
        if (product?.productId?.discount_price) {
          return acc + product?.productId?.discount_price * product?.quantity;
        } else {
          return acc + product?.productId.price * product?.quantity;
        }
      }, 0)
      .toFixed(2);
  };

  // 10% tax calulations with total
  const calculateTaxAndTotal = () => {
    const amount = totalPriceByProduct();
    const tax = Number(amount) * 0.05;
    return (tax + Number(amount)).toFixed(2);
  };

  const calculateTotalUnits = () => {
    return items?.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="container gap-6 pb-16 flex flex-col md:flex-row justify-between">
      <div className="w-[100%] md:w-[70%]">
        <div className="flex flex-col border gap-6 p-4 border-gray-200 rounded">
          {items &&
            items?.length > 0 &&
            items.map((cart) => {
              return (
                <div
                  key={cart?.productId?._id}
                  className="flex items-center justify-between w-full gap-x-2"
                >
                  <div className="w-28">
                    <Image
                      src={cart?.productId?.images[0]}
                      alt={cart?.productId?.name}
                      width={500}
                      height={500}
                      className="rounded-md"
                    />
                  </div>
                  <div className="w-1/3">
                    <Link
                      href={`/products/${cart?.productId?._id}`}
                      className="text-gray-800 text-xl font-medium uppercase"
                    >
                      {cart?.productId?.name}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      Availability:{" "}
                      <span className="text-green-600">In Stock</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                      <div
                        onClick={() =>
                          handleDecrementFromCart(cart?.productId?._id)
                        }
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                      >
                        -
                      </div>
                      <div className="h-8 w-12 text-center text-base flex items-center justify-center p-2">
                        {cart?.quantity}
                      </div>

                      <div
                        onClick={() => handleIncrement(cart?.productId?._id, 1)}
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                      >
                        +
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg">
                        {(
                          (cart?.productId?.discount_price
                            ? cart?.productId?.discount_price
                            : cart?.productId?.price) * cart?.quantity
                        ).toFixed(2)}
                        {" /-"}
                      </span>
                      <span className="text-primary text-md font-semibold">
                        {cart?.productId?.discount_price
                          ? cart?.productId?.discount_price
                          : cart?.productId?.price}{" "}
                        /-{" "}
                        <span className="text-sm text-slate-400 font-normal">
                          per item
                        </span>
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={() => handleRemoveFromCart(cart?.productId?._id)}
                    className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer"
                  >
                    Remove from cart
                  </span>
                  <div className="text-gray-600 cursor-pointer hover:text-primary">
                    <i className="fa-solid fa-trash" />
                  </div>
                </div>
              );
            })}

          {items?.length === 0 && "No items in Cart"}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[100%] md:w-[30%]">
        <div className="flex flex-col border gap-2 p-4 border-gray-200 rounded">
          <div className="flex justify-between items-center w-[100%]">
            <p>Price:</p>
            <p>${totalPriceByProduct()}</p>
          </div>
          <div className="flex justify-between items-center w-[100%]">
            <p>Total Units:</p>
            <p>{calculateTotalUnits()} (Units)</p>
          </div>
          <div className="flex justify-between items-center w-[100%]">
            <p>Tax:</p>
            <p>5%</p>
          </div>
          <span className="bg-slate-400 w-full border-[1px] my-2"></span>
          <div className="flex justify-between items-center w-[100%]">
            <p className="text-lg font-bold">Total price:</p>
            <p className="text-lg font-bold">${calculateTaxAndTotal()}</p>
          </div>
          <Link
            className="w-full bg-[#FD3D57] text-white text-center p-3 text-md font-semibold rounded-md"
            href="/checkout"
          >
            {" "}
            Continue{" "}
          </Link>

          <Link
            className="w-full text-[#FD3D57] text-center p-3 text-md font-semibold rounded-md"
            href="/shop"
          >
            {" "}
            Back to shop{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartComponent;
