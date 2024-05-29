import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import StarsReviews from "../products/StarsReviews";
import AddToCart from "../products/AddToCart";
import { auth } from "@/auth";
import AddToWishList from "./wishlist/AddToWishList";

async function ShopProductCard({ product }) {
  const session = await auth();

  //let randomImgUrl = await getRandomImageUrl(product?.images[0]);

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Image
          src={product?.images[0]}
          alt={product?.name}
          width={100}
          height={100}
          className="w-full"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
          justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/products/${product?.id}?sa=sas`}
            as={`/products/${product?.id}?sa=sas`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>

          <AddToWishList
            productId={product?.id?.toString()}
            userEmail={session?.user?.email.toString()}
          />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/products/${product?.id}`} as={`/products/${product?.id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-1">
            {product?.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${product?.discount_price}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product?.price}
          </p>
        </div>
        <StarsReviews
          ratings={product?.ratings}
          reviewsNumber={product?.reviewsNumber}
        />
      </div>
      <AddToCart userEmail={session?.user?.email} productId={product?.id} />
    </div>
  );
}

export default ShopProductCard;
