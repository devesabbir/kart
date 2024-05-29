"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function CategoriesFilter() {
  const searchParams = useSearchParams();
  const [cats, setCats] = useState([]);
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCats([...cats, name]);
    } else {
      const filtered = cats.filter((item) => item !== name);
      setCats(filtered);
    }
  };

  useEffect(() => {
    const hasCategory = params.get("category");
    if (hasCategory) {
      const p = hasCategory.includes("|")
        ? hasCategory.split("|")
        : [hasCategory];
      const categoryArry = [...p];
      setCats(categoryArry);
    }
  }, [params]);

  useEffect(() => {
    if (cats.length > 0) {
      params.set("category", cats.join("|"));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [cats, params, pathname, replace]);

  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            name="bedroom"
            id="cat-1"
            checked={cats.includes("bedroom")}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer">
            Bedroom
          </label>
          {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
        </div>
        <div className="flex items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            name="sofa"
            id="cat-2"
            checked={cats.includes("sofa")}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label htmlFor="cat-2" className="text-gray-600 ml-3 cusror-pointer">
            Sofa
          </label>
          {/* <div className="ml-auto text-gray-600 text-sm">(9)</div> */}
        </div>
        <div className="flex items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            name="office"
            id="cat-3"
            checked={cats.includes("office")}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label htmlFor="cat-3" className="text-gray-600 ml-3 cusror-pointer">
            Office
          </label>
          {/* <div className="ml-auto text-gray-600 text-sm">(21)</div> */}
        </div>
        <div className="flex items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            name="outdoor"
            id="cat-4"
            checked={cats.includes("outdoor")}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label htmlFor="cat-4" className="text-gray-600 ml-3 cusror-pointer">
            Outdoor
          </label>
          {/* <div className="ml-auto text-gray-600 text-sm">(10)</div> */}
        </div>
      </div>
    </div>
  );
}

export default CategoriesFilter;
