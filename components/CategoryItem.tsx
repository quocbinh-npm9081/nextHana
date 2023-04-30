import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryItem = ({ category }: any) => {
  return (
    <div className="card-category">
      <Link href={`/category/${category.slug}`} legacyBehavior>
        <a className="flex flex-col items-center justify-start h-48 overflow-hidden relative p-2">
          <img
            src={category.image}
            alt={category.name}
            className="rounded-sm shadow"
          />
          <div className="absolute left-10  top-14">
            <h2>{category.name}</h2>
          </div>
          <div className="absolute left-10 bottom-10">
            <h3 className="underline">Xem ngay</h3>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryItem;
