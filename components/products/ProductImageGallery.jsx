"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function ProductImageGallery({ productBuffer }) {
  const [images, setImages] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setImageIndex(index);
  };

  useEffect(() => {
    const product = JSON.parse(productBuffer);
    if (product) {
      setImages(product);
    }
  }, [productBuffer]);

  return (
    <div>
      {images?.images?.length > -1 && (
        <Image
          src={images?.images[imageIndex]}
          alt={images?.name}
          width={100}
          height={100}
          className="w-full"
        />
      )}

      <div className="grid grid-cols-5 gap-4 mt-4">
        {images?.images?.map((p, i) => {
          return (
            <Image
              key={p + i}
              width={100}
              height={100}
              src={p}
              alt="product2"
              onClick={() => handleChangeIndex(i)}
              className="w-full cursor-pointer border border-primary"
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductImageGallery;
