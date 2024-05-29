"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function NavigateToLogin({ path }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("callbackurl", process.env.NEXT_PUBLIC_SITE_URL + path);

    window.location.href =
      process.env.NEXT_PUBLIC_SITE_URL +
      "/" +
      pathname.split("/")[1] +
      "/login?" +
      params.toString();
  }, [path, pathname, searchParams]);

  return null;
}

export default NavigateToLogin;
