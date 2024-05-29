"use client";

import { useCart } from "@/contexts/CartContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function AddToCartDetailsPage({ productId, userEmail }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const context = useCart();

  const handletoCart = () => {
    if (productId && userEmail) {
      const params = new URLSearchParams(searchParams);
      const newItem = {
        productId: productId,
        qty: params.get("quantities"),
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

      params.set("productId", productId);
      params.set("qty", params.get("quantities"));

      if (pathname.split("/").length > 3) {
        const newPath = pathname.split("/").slice(0, 2).join("/");
        replace(newPath + "/login?" + params.toString());
      } else {
        replace(`${pathname}/login?` + params.toString());
      }
    }
  };

  return (
    <button
      onClick={handletoCart}
      className={`bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition`}
    >
      <FontAwesomeIcon icon={faCartShopping} /> Add to cart
    </button>
  );
}

export default AddToCartDetailsPage;
