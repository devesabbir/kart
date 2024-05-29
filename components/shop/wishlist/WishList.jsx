"use client";

import AddToCart from "@/components/products/AddToCart";
import { useWishList } from "@/contexts/WishListContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import WishListRemoveButton from "./WishListRemoveButton";

function WishList() {
  const { wishList } = useWishList();

  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        {wishList?.items?.map((item) => (
          <div
            key={item?._id}
            className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
          >
            <div className="w-28">
              <Image
                width={100}
                height={100}
                src={item?.images[0]}
                alt={item?.name}
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <Link href={`/products/${item?._id}`}>
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                  {item?.name}
                </h2>
              </Link>

              <p className="text-gray-500 text-sm">
                Availability:{" "}
                {item?.availability ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Stock Out</span>
                )}
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">
              ${item?.discount_price ? item?.discount_price : item?.price}
            </div>
            <div className="px-6 py-2 text-center">
              <AddToCart
                fromWishList={true}
                productId={item?._id}
                userEmail={wishList?.userId?.email}
              />
            </div>

            <WishListRemoveButton
              productId={item?._id}
              userEmail={wishList?.userId?.email}
            />
          </div>
        ))}
        {wishList?.items?.length === 0 && "No items in your wish list"}
      </div>
    </div>
  );
}

export default WishList;
