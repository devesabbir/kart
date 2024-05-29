"use client";

import { signInWithFacebook, signInWithGoogle } from "@/actions/server-actions";
import { useSearchParams } from "next/navigation";

function SocialLogin() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const callbackurl = params.get("callbackurl");

  const handleLoginWithFacebook = async (event) => {
    event.preventDefault();
    await signInWithFacebook(callbackurl);
  };
  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();
    await signInWithGoogle(callbackurl);
  };

  return (
    <div className="mt-4 flex gap-4">
      <a
        onClick={handleLoginWithFacebook}
        href="#"
        className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
      >
        facebook
      </a>
      <a
        onClick={handleLoginWithGoogle}
        href="#"
        className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
      >
        google
      </a>
    </div>
  );
}

export default SocialLogin;
