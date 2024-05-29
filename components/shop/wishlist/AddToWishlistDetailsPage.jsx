"use client";

import { useWishList } from "@/contexts/WishListContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddToWishListDetailsPage({ productId, userEmail }) {
  const context = useWishList();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isListed, setIsListed] = useState(false);

  const handleAddRemoveToWishlist = () => {
    if (productId && userEmail) {
      const isList = context?.wishList?.items?.find(
        (item) => item?._id?.toString() === productId?.toString()
      );
      if (!isList) {
        context.addToWishList(productId);
        toast.success("Added as favorite");
      } else {
        context.removeFromWishlist(productId);

        toast.error("Removed from favorite");
      }
    } else {
      const params = new URLSearchParams(searchParams);
      params.set(
        "callbackurl",
        process.env.NEXT_PUBLIC_SITE_URL + "/" + pathname
      );

      if (pathname.split("/").length > 2) {
        replace(`login?` + params.toString());
      } else {
        replace(`${pathname}/login?` + params.toString());
      }
    }
  };

  useEffect(() => {
    const isList = context?.wishList?.items?.find(
      (item) => item?._id?.toString() === productId?.toString()
    );

    if (isList) {
      setIsListed(true);
    } else {
      setIsListed(false);
    }
  }, [context?.wishList?.items, productId]);

  return (
    <button
      onClick={handleAddRemoveToWishlist}
      className={`border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition ${
        isListed && "text-primary"
      }`}
    >
      <FontAwesomeIcon icon={faHeart} /> Wishlist
    </button>
  );
}

export default AddToWishListDetailsPage;
