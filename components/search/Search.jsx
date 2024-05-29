"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Search() {
  const [term, setTerm] = useState("");
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      setTerm(value);
    } else {
      setTerm("");
    }
  };

  const doSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", term);
    if (pathname.includes("shop")) {
      replace(`${pathname}?${params.toString()}`);
    } else if (!pathname.includes("shop") && pathname.split("/").length > 2) {
      const newpath = pathname.split("/").slice(0, 2).join("/");
      replace(`${newpath}/shop?${params.toString()}`);
    } else if (!pathname.includes("shop")) {
      replace(`${pathname}/shop?${params.toString()}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const hasQuery = params.get("q");
    if (hasQuery) {
      setTerm(hasQuery);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-xl relative flex">
      <span className="absolute left-4 top-3 text-lg text-gray-400">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        value={term || ""}
        onChange={handleChange}
        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
        placeholder="search"
      />
      <button
        onClick={doSearch}
        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
