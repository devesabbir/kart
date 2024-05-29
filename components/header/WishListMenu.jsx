"use client";

import { useWishList } from "@/contexts/WishListContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function WishListMenu() {
  const { wishList } = useWishList();

  return (
    <Link
      href={"/account/wishlist"}
      as={"/account/wishlist"}
      className="text-center text-gray-700 hover:text-primary transition relative"
    >
      <div className="text-2xl">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="text-xs leading-3">Wishlist</div>
      {wishList?.count > 0 && (
        <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {wishList?.count}
        </div>
      )}
    </Link>
  );
}

export default WishListMenu;
