import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryItem = ({ category }: any) => {
  return (
    <div className="card-category">
      <Link href={`/category/${category.slug}`} legacyBehavior>
        <a className="flex flex-col items-center justify-start h-52 overflow-hidden relative p-2">
          <Image
            fill={true}
            src={category.image}
            alt={category.name}
            className="rounded-sm shadow w-full h-full"
          />
          <div className="absolute left-10  top-14 text-lg">
            <h2>{category.name}</h2>
          </div>

          <div className="absolute  left-10 bottom-14 inline-flex text- justify-center items-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <h3 className="no-underline">Xem ngay</h3>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryItem;
