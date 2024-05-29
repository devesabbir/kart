"use client";

import { useWishList } from "@/contexts/WishListContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddToWishList({ productId, userEmail }) {
  const context = useWishList();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <button
      onClick={handleAddRemoveToWishlist}
      className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition cursor-pointer"
      title="add to wishlist"
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export default AddToWishList;
