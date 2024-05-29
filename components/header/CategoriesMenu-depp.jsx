import Image from "next/image";
import sofa from "@/public/assets/images/icons/sofa.svg";
import terrace from "@/public/assets/images/icons/terrace.svg";
import bed from "@/public/assets/images/icons/bed.svg";
import office from "@/public/assets/images/icons/office.svg";
import outdoorCafe from "@/public/assets/images/icons/outdoor-cafe.svg";
import bed2 from "@/public/assets/images/icons/bed-2.svg";
import Link from "next/link";

function CategoriesMenu() {
  return (
    <div
      className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
      style={{ width: 300 }}
    >
      <Link
        href={"/shop?category=sofa"}
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
      </Link>
      <Link
        href={"shop?category=living Room"}
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
      </Link>
      <Link
        href={"shop?category=bedroom"}
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
      </Link>
      <Link
        href={"shop?category=outdoor"}
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
      </Link>
      <Link
        href={"shop?category=indoor"}
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
      </Link>
      <Link
        href={"shop?category=mattress"}
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
      </Link>
    </div>
  );
}

export default CategoriesMenu;
