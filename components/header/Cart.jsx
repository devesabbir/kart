"use client";

import { useCart } from "@/contexts/CartContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Cart() {
  const { cart } = useCart();

  return (
    <Link
      href={"/account/cart"}
      className="text-center text-gray-700 hover:text-primary transition relative"
    >
      <div className="text-2xl">
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      <div className="text-xs leading-3">Cart</div>
      {cart?.count > 0 && (
        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {cart?.count}
        </div>
      )}
    </Link>
  );
}

export default Cart;
