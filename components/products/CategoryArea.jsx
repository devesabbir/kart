"use client";

import Image from "next/image";
import categoryOne from "@/public/assets/images/category/category-1.jpg";
import categoryTwo from "@/public/assets/images/category/category-2.jpg";
import categoryThree from "@/public/assets/images/category/category-3.jpg";
import categoryFour from "@/public/assets/images/category/category-4.jpg";
import categoryFive from "@/public/assets/images/category/category-5.jpg";
import categorySix from "@/public/assets/images/category/category-6.jpg";
import { usePathname, useRouter } from "next/navigation";

function CategoryArea() {
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleNavigate = (query) => {
    const params = new URLSearchParams();
    params.set("category", query.toLowerCase());
    replace(`${pathname}/shop?${params.toString()}`);
  };

  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categoryOne}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Bedroom")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Bedroom
          </span>
        </div>{" "}
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categoryTwo}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Mattrass")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Mattrass
          </span>
        </div>{" "}
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categoryThree}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Outdoor")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Outdoor
          </span>
        </div>{" "}
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categoryFour}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Sofa")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Sofa
          </span>
        </div>{" "}
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categoryFive}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Living Room")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Living Room
          </span>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <Image
            src={categorySix}
            alt="category 1"
            width={100}
            height={100}
            className="w-full"
          />
          <span
            onClick={() => handleNavigate("Kitchen")}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition cursor-pointer"
          >
            Kitchen
          </span>
        </div>
      </div>
    </div>
  );
}

export default CategoryArea;
