"use client";

import { signInWithCredentials } from "@/actions/server-actions";
import { useCart } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function LoginForm() {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = useCart();
  const params = new URLSearchParams(searchParams);
  const [orderItem, setOrderItem] = useState({});

  const callbackurl = params.get("callbackurl");
  const productId = params.get("productId");
  const qty = params.get("qty");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validate = validateForm(data);
    if (validate) {
      try {
        await signInWithCredentials(formData);
        router.push(`${callbackurl ? callbackurl : "/"}`);

        if (orderItem) {
          context.addToCart(orderItem);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (productId && qty) {
      setOrderItem({
        productId: productId,
        qty: qty,
      });
    }
  }, [productId, qty]);

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = "Please enter your email";
    }
    if (!data.password) {
      errors.password = "Please enter a password";
    }
    setErrors({ ...errors });
    if (Object.keys(errors).length === 0) return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary ${
              errors?.email && "border-primary"
            } placeholder-gray-400`}
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary ${
              errors?.password && "border-primary"
            } placeholder-gray-400`}
            placeholder="*******"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
