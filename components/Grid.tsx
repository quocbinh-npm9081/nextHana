import React, { Children } from "react";
import data from "../utils/data";
import ProductItem from "./ProductItem";

interface IProps {
  children: React.ReactNode | Element;
}

const Grid = ({ children }: IProps) => {
  return (
    <div className="mt-10 p-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <>{children}</>
    </div>
  );
};

export default Grid;
