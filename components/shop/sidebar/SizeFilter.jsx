"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function SizeFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const [size, setSize] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSize(value);
  };

  useEffect(() => {
    const hasSize = params.get("size");
    if (hasSize) {
      setSize(hasSize);
    }
  }, [params]);

  useEffect(() => {
    if (size) {
      params.set("size", size);
    } else {
      params.delete("size");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [params, pathname, replace, size]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        <div className="size-selector">
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            value={"xs"}
            id="size-xs"
            checked={size === "xs"}
            className="hidden"
          />
          <label
            htmlFor="size-xs"
            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
          >
            XS
          </label>
        </div>
        <div className="size-selector">
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            value={"s"}
            checked={size === "s"}
            id="size-sm"
            className="hidden"
          />
          <label
            htmlFor="size-sm"
            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
          >
            S
          </label>
        </div>
        <div className="size-selector">
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            value={"m"}
            checked={size === "m"}
            id="size-m"
            className="hidden"
          />
          <label
            htmlFor="size-m"
            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
          >
            M
          </label>
        </div>
        <div className="size-selector">
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            value={"l"}
            checked={size === "l"}
            id="size-l"
            className="hidden"
          />
          <label
            htmlFor="size-l"
            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
          >
            L
          </label>
        </div>
        <div className="size-selector">
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            value={"xl"}
            checked={size === "xl"}
            id="size-xl"
            className="hidden"
          />
          <label
            htmlFor="size-xl"
            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
          >
            XL
          </label>
        </div>
      </div>
    </div>
  );
}

export default SizeFilter;
