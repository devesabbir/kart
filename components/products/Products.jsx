import Image from "next/image";
import productImage from "@/public/assets/images/products/product1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Products({ title }) {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded overflow-hidden group">
          <div className="relative">
            <Image
              width={100}
              height={100}
              src={productImage}
              alt="product 1"
              className="w-full"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
          justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
            >
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="view product"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </a>
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="add to wishlist"
              >
                <FontAwesomeIcon icon={faHeart} />
              </a>
            </div>
          </div>
          <div className="pt-4 pb-3 px-4">
            <Link href={"/products/1"}>
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                Guyer Chair
              </h4>
            </Link>
            <div className="flex items-baseline mb-1 space-x-2">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-sm text-gray-400 line-through">$55.90</p>
            </div>
            <div className="flex items-center">
              <div className="flex gap-1 text-sm text-yellow-400">
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default Products;
