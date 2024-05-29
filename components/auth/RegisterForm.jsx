"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterForm() {
  const router = useRouter();
  const [aggrement, setAggrement] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validate = validateForm(data);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!data.aggrement) {
      setAggrement(
        "You cannot proceed without agreeing to the Terms & Conditions."
      );
    } else {
      setAggrement("");
      if (validate) {
        try {
          const promise = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, password }),
            }
          );
          const res = await promise.json();
          if (res.status === 200) {
            router.push("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Please enter your name";
    }
    if (!data.email) {
      errors.email = "Please enter your email";
    }

    if (!data.password) {
      errors.password = "Please enter a password";
    }

    if (data.password !== data.confirm) {
      errors.notmatch = "Password did not match!";
    }

    setErrors({ ...errors });
    if (Object.keys(errors).length === 0) return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="text-gray-600 mb-2 block">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary ${
              errors?.name && "border-primary"
            } placeholder-gray-400`}
            placeholder="fulan fulana"
          />
        </div>
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
        <div>
          <label htmlFor="confirm" className="text-gray-600 mb-2 block">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary ${
              errors?.notmatch && "border-primary"
            } placeholder-gray-400`}
            placeholder="*******"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className={`text-primary focus:ring-0 rounded-sm cursor-pointer border-2 ${
              aggrement && "border-red-500"
            }`}
          />
          <label
            htmlFor="aggrement"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary">
              terms &amp; conditions
            </a>
          </label>
        </div>
        <p className="text-red-500">{aggrement}</p>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          create account
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
