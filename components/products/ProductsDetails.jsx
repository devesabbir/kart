import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import StarsReviews from "./StarsReviews";
import Quantity from "./Quantity";
import AddToCartDetailsPage from "./AddToCartDetailsPage";
import ProductImageGallery from "./ProductImageGallery";
import AddToWishListDetailsPage from "../shop/wishlist/AddToWishlistDetailsPage";

function ProductsDetails({ product, userEmail }) {
  return (
    <div className="container grid grid-cols-2 gap-6">
      <ProductImageGallery productBuffer={JSON.stringify(product)} />
      <div>
        <h2 className="text-3xl font-medium uppercase mb-2">{product?.name}</h2>

        <StarsReviews
          ratings={product?.ratings}
          reviewsNumber={product?.reviewsNumber}
        />

        <div className="space-y-2">
          <p className="text-gray-800 font-semibold space-x-2">
            <span>Availability: </span>
            {product?.availability ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Brand: </span>
            <span className="text-gray-600">{product?.brand}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Category: </span>
            <span className="text-gray-600">{product?.category}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">SKU: </span>
            <span className="text-gray-600">{product?.sku}</span>
          </p>
        </div>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <p className="text-xl text-primary font-semibold">
            ${product?.discount_price}
          </p>
          <p className="text-base text-gray-400 line-through">
            ${product?.price}
          </p>
        </div>
        <p className="mt-4 text-gray-600">{product?.description}</p>

        <Quantity />

        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <AddToCartDetailsPage
            productId={product?._id.toString()}
            userEmail={userEmail?.toString()}
          />

          <AddToWishListDetailsPage
            productId={product?._id.toString()}
            userEmail={userEmail?.toString()}
          />
        </div>
        <div className="flex gap-3 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
