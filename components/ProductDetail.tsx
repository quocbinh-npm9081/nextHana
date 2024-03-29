import React, { useCallback, useEffect, useState } from "react";
import ThumbnailSwiper from "./ThumbnailSwiper";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import data from "@/utils/data";
import { addProductToCart, selectCart } from "@/utils/slice";
import { IInfoProduct, IProduct } from "@/utils/types";
import dynamic from "next/dynamic";
interface IProps {
  product: IProduct;
}
const ProductDetail = ({ product }: IProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  const {
    query: { slug },
  } = useRouter();
  const [bought, setBought] = useState<boolean>(false);

  const [yourSize, setYourSize] = useState<string | undefined>(
    product.sizes[0]
  );
  const [yourColor, setYourColor] = useState<string | undefined>(
    product.colors[0]
  );

  const [quantityOrder, setQuantityOrder] = useState<number>(1);

  const [totalPrice, setTotalPrice] = useState<number>(
    product.price * quantityOrder
  );
  // const [salePercent, setSalePercent] = useState<number>(product.sale);

  const convertRatingToStar = useCallback(
    (rating: number) => {
      const ratingRounded = Math.ceil(rating);
      const emptyStart = 5 - ratingRounded;
      const ratingStart = [...Array(ratingRounded)];
      const ratingStartEmpty = [...Array(emptyStart)];

      return (
        <>
          {ratingStart.map((start: number, index: number) => (
            <svg
              key={index}
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          ))}
          {ratingStartEmpty.length > 0 && (
            <>
              {ratingStartEmpty.map((start: number, index: number) => (
                <svg
                  key={index}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ))}
            </>
          )}
        </>
      );
    },
    [product.rating]
  );

  const addProductToCartHandle = () => {
    const item = data.products.find((product) => product.slug === slug);

    const newItem = { ...item };
    try {
      dispatch(
        addProductToCart({
          item: newItem as IProduct,
          quantity: quantityOrder,
          status: "ordered",
          totalPrice: totalPrice,
          yourSize: yourSize,
          yourColor: yourColor,
        })
      );
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.success("Lỗi hệ thống !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const changeQuantity = (count: number) => {
    if (count < 0 && quantityOrder > 1) {
      setQuantityOrder((prev) => --prev);
    }

    if (count > 0 && quantityOrder < product.countInStock) {
      setQuantityOrder((prev) => ++prev);
    }
  };

  const changeYourSize = (size: string) => {
    setYourSize(size);
  };
  const changeYourColor = (color: string) => {
    setYourColor(color);
  };

  useEffect(() => {
    const calToTalPrice = () => {
      const newPrice = product.price - (product.price * product.sale) / 100;
      setTotalPrice(newPrice * quantityOrder);
    };
    calToTalPrice();
    return () => {
      calToTalPrice();
    };
  }, [quantityOrder]);

  useEffect(() => {
    const item = cart.cartItems.find(
      (product: IInfoProduct) => product.item.slug == slug
    );

    if (item) setBought(true);
    else setBought(false);
  }, [slug, cart.cartItems]);

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <ThumbnailSwiper images={product.images} />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {product.rating > 0 && convertRatingToStar(product.rating)}

                <span className="text-gray-600 ml-3">
                  {product.numReviews} Reviews
                </span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <span className="text-gray-600 ml-3">
                  Còn {product.countInStock} sản phẩm
                </span>

                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed webkit-line-clamp-truncate">
              {product.description}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center justify-center border rounded-md">
                <button
                  className="bg-white text-xl hover:bg-red-400 rounded-l-md px-2 py-1"
                  onClick={() => changeQuantity(-1)}
                >
                  -
                </button>
                <span className="mx-4  font-semibold text-gray-700 text-lg ">
                  {quantityOrder}
                </span>
                <button
                  className="bg-white text-xl hover:bg-red-400 rounded-r-md px-2 py-1"
                  onClick={() => changeQuantity(1)}
                >
                  +
                </button>
              </div>
              <div className="flex flex-col items-end md:flex-row w-full">
                {product.sizes.length > 0 && (
                  <div className="flex ml-6 items-center mb-2 md:mb-0">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select
                        onChange={(e) => changeYourSize(e.target.value)}
                        className="uppercase rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                      >
                        {product.sizes.map(
                          (size: string | undefined, index: number) => {
                            return (
                              <option
                                className="uppercase"
                                key={size}
                                value={size}
                              >
                                {size}
                              </option>
                            );
                          }
                        )}
                      </select>

                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
                {product.colors.length > 0 && (
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Color:</span>
                    <div className="relative">
                      <select
                        onChange={(e) => changeYourColor(e.target.value)}
                        className=" capitalize rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                      >
                        {product.colors.map(
                          (color: string | undefined, index: number) => {
                            return (
                              <option
                                className="capitalize"
                                key={color}
                                value={color}
                              >
                                {color}
                              </option>
                            );
                          }
                        )}
                      </select>

                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center">
              <span className="flex flex-col items-start justify-between">
                <span
                  className={
                    product.sale != 0
                      ? "title-font line-through font-medium text-lg text-gray-500"
                      : "title-font font-medium text-2xl text-red-600"
                  }
                >
                  {product.sale == 0
                    ? product.price * quantityOrder
                    : product.price}{" "}
                  VND
                </span>
                {product.sale > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {totalPrice} VND
                  </span>
                )}
              </span>

              {!bought && (
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => addProductToCartHandle()}
                >
                  Thêm vào giỏ hàng
                </button>
              )}

              {bought && (
                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                  Đã thêm vào giỏ hàng
                </button>
              )}

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(ProductDetail), { ssr: false });
