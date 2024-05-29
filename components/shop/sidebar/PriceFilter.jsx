"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function PriceFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [price, setPrice] = useState({ min: "", max: "" });
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrice((prevState) => {
      return { ...prevState, [name]: value || "" };
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const hasMinPrice = urlParams.get("minprice");
    const hasMaxPrice = urlParams.get("maxprice");

    if (hasMinPrice) {
      setPrice((prev) => ({ ...prev, min: hasMinPrice }));
    }
    if (hasMaxPrice) {
      setPrice((prev) => ({ ...prev, max: hasMaxPrice }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (price?.min) {
      params.set("minprice", price.min);
    }

    if (price?.max) {
      params.set("maxprice", price.max);
    }

    if (!price?.min) {
      params.delete("minprice");
    }
    if (!price?.max) {
      params.delete("maxprice");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [params, pathname, price.max, price.min, replace]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Price
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          name="min"
          id="min"
          onChange={handleChange}
          value={price?.min}
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="min"
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="text"
          name="max"
          id="max"
          value={price?.max}
          onChange={handleChange}
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="max"
        />
      </div>
    </div>
  );
}

export default PriceFilter;
