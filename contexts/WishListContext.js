"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState({});
  const { data: session, status } = useSession();

  const fetchWishList = async (email) => {
    const resBuffer = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/wishlist?useremail=${email}`,
      { method: "GET" }
    );

    const res = await resBuffer.json();

    setWishList(res?.data);
  };

  useEffect(() => {
    if (session?.user?.email) {
      const wishList = async () => {
        await fetchWishList(session?.user?.email);
      };
      wishList();
    }
  }, [session?.user?.email]);

  const addToWishList = async (productId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/wishlist?useremail=${session?.user?.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedWishList = await res.json();
      setWishList(updatedWishList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const params = new URLSearchParams();
      params.set("action", "delete");
      params.set("useremail", session?.user?.email);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/wishlist?` +
          params.toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to Wishlist");
      }

      const updatedWishlist = await res.json();

      setWishList(updatedWishlist.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WishListContext.Provider
      value={{ wishList, addToWishList, removeFromWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
