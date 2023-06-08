import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }: any) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} legacyBehavior>
        <a className="flex flex-col items-center justify-start relative">
          <div className="absolute p-2 h-14 w-14 text-white rounded-full bg-red-600 flex justify-center items-center top-3 left-4">
            -{product.sale}%
          </div>
          <Image
            width={350}
            height={350}
            quality={100}
            src={product.images[0]}
            alt={product.name}
            className="rounded-sm shadow"
            title="ProductItem"
          />
          <div className="flex-col flex items-start ">
            <h3>{product.name}</h3>
            <div className="flex">
              {product.priceSale ? (
                <div>
                  <h4 className="line-through">{product.price}</h4>
                  <h4>{product.priceSale} VND</h4>
                </div>
              ) : (
                <h4>{product.price} VND</h4>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductItem;
