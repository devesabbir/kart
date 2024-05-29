"use server";

import { signIn } from "@/auth";
import { addToCart } from "@/queries/shop-queries";
import { revalidatePath } from "next/cache";

async function signInWithGoogle(callbackurl) {
  try {
    const res = await signIn("google", {
      redirectTo: callbackurl ? callbackurl : process.env.SITE_URL,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function signInWithFacebook(callbackurl) {
  try {
    const res = await signIn("facebook", {
      redirectTo: callbackurl ? callbackurl : process.env.SITE_URL,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function signInWithCredentials(formData) {
  const userInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    await signIn("credentials", userInfo);
  } catch (error) {
    throw error;
  }
}
async function addToCartActions(userEmail, productId) {
  try {
    await addToCart(userEmail, productId);
    revalidatePath("/shop");
    return {
      message: "Added to Cart",
    };
  } catch (error) {
    throw error;
  }
}

export {
  signInWithGoogle,
  signInWithFacebook,
  signInWithCredentials,
  addToCartActions,
};
