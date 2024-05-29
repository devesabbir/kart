"use client";

import Image from "next/image";
import sofa from "@/public/assets/images/icons/sofa.svg";
import terrace from "@/public/assets/images/icons/terrace.svg";
import bed from "@/public/assets/images/icons/bed.svg";
import office from "@/public/assets/images/icons/office.svg";
import outdoorCafe from "@/public/assets/images/icons/outdoor-cafe.svg";
import bed2 from "@/public/assets/images/icons/bed-2.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CategoriesMenu() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleButtonClick = (q) => {
    const params = new URLSearchParams(searchParams);
    if (q) {
      params.set("category", q);
      if (pathname.includes("/shop")) {
        replace(`${pathname}?${params.toString()}`);
      } else if (
        !pathname.includes("/shop" && pathname.split("/").length > 2)
      ) {
        const newpath = pathname.split("/").slice(0, 2).join("/");
        replace(`${newpath}/shop?${params.toString()}`);
      } else {
        replace(`${pathname}shop?${params.toString()}`, { scroll: false });
      }
    }
  };

  return (
    <div
      className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
      style={{ width: 300 }}
    >
      <span
        onClick={() => handleButtonClick("sofa")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={sofa}
          alt="sofa"
          width={100}
          height={100}
          className="w-5 h-5 object-contain"
        />
        <span className="ml-6 text-gray-600 text-sm">Sofa</span>
      </span>
      <span
        onClick={() => handleButtonClick("Living Room")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={terrace}
          alt="terrace"
          className="w-5 h-5 object-contain"
          width={100}
          height={100}
        />
        <span className="ml-6 text-gray-600 text-sm">Living Room</span>
      </span>
      <span
        onClick={() => handleButtonClick("Bedroom")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={bed}
          alt="bed"
          className="w-5 h-5 object-contain"
          width={100}
          height={100}
        />
        <span className="ml-6 text-gray-600 text-sm">Bedroom</span>
      </span>
      <span
        onClick={() => handleButtonClick("Outdoor")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={office}
          alt="Outdoor"
          className="w-5 h-5 object-contain"
          width={100}
          height={100}
        />
        <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
      </span>
      <span
        onClick={() => handleButtonClick("Indoor")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={outdoorCafe}
          alt="outdoor"
          className="w-5 h-5 object-contain"
          width={100}
          height={100}
        />
        <span className="ml-6 text-gray-600 text-sm">Indoor</span>
      </span>
      <span
        onClick={() => handleButtonClick("Mattress")}
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={bed2}
          alt="Mattress"
          className="w-5 h-5 object-contain"
          width={100}
          height={100}
        />
        <span className="ml-6 text-gray-600 text-sm">Mattress</span>
      </span>
    </div>
  );
}

export default CategoriesMenu;
