"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Quantity() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [quantities, setQuantities] = useState(1);

  const incrementQuantities = () => {
    setQuantities((prev) => prev + 1);
  };

  const decrementQuantities = () => {
    if (quantities > 1) {
      setQuantities((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const hasQuantities = params.get("quantities");
    if (hasQuantities) {
      const toNum = Number(hasQuantities);
      setQuantities(toNum);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (quantities) {
      params.set("quantities", quantities);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, quantities, replace, searchParams]);

  return (
    <div className="mt-4">
      <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
      <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
        <div
          onClick={decrementQuantities}
          className={`h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none ${
            quantities === 1 && "pointer-events-none"
          }`}
        >
          -
        </div>
        <div className="h-8 w-8 text-base flex items-center justify-center">
          {quantities}
        </div>
        <div
          onClick={incrementQuantities}
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
        >
          +
        </div>
      </div>
    </div>
  );
}

export default Quantity;
