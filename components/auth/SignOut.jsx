"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000/login" });
      }}
      className="text-slate-300"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
