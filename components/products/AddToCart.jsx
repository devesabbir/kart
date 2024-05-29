"use client";

import { useCart } from "@/contexts/CartContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function AddToCart({ productId, userEmail, fromWishList }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const context = useCart();

  const handletoCart = () => {
    if (productId && userEmail) {
      const newItem = {
        productId: productId,
        qty: 1,
      };

      const isCart = context?.cart?.items?.find(
        (item) => item?.productId?._id?.toString() === productId?.toString()
      );

      if (!isCart) {
        context.addToCart(newItem);
        toast.success("Added product in cart");
      } else {
        toast.warn("Already in cart.");
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
      onClick={handletoCart}
      className={`block w-full ${
        fromWishList ? "py-2 px-3" : "py-1"
      } py-2 px-3 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition`}
    >
      Add to cart
    </button>
  );
}

export default AddToCart;
