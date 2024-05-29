"use client";

import { useWishList } from "@/contexts/WishListContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function WishListRemoveButton({ productId, userEmail }) {
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

  console.log(productId, userEmail);
  return (
    <div
      onClick={handleAddRemoveToWishlist}
      className="text-gray-600 cursor-pointer hover:text-primary"
    >
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}

export default WishListRemoveButton;
