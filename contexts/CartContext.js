"use client";

import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { data: session, status } = useSession();

  const getAllCarts = async (email) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/cart?useremail=${email}`,
      { method: "GET" }
    );

    const data = await res.json();
    setCart(data.data);
  };

  useEffect(() => {
    const carts = async () => {
      await getAllCarts(session?.user?.email);
    };
    carts();
  }, [session?.user?.email]);

  const addToCart = async (newItem) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            productId: newItem?.productId,
            qty: newItem?.qty || 1,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedCart = await res.json();
      setCart(updatedCart.data);
    } catch (error) {
      console.error(error);
    }
  };

  const decrementCartItem = async (productId) => {
    try {
      const params = new URLSearchParams();
      params.set("action", "decrement");
      params.set("userEmail", session?.user?.email);
      params.set("productId", productId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/cart?` +
          params.toString(),
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedCart = await res.json();
      setCart(updatedCart.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const params = new URLSearchParams();
      params.set("action", "delete");
      params.set("userEmail", session?.user?.email);
      params.set("productId", productId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/cart?` +
          params.toString(),
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedCart = await res.json();
      setCart(updatedCart.data);
    } catch (error) {
      console.error(error);
    }
  };

  const value = { cart, addToCart, removeFromCart, decrementCartItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
