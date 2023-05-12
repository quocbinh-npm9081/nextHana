import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  addProductToCart,
  removeProductInCart,
  updateYourSize,
  selectCart,
} from "@/utils/slice";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import Image from "next/image";
import { IInfoProduct } from "@/utils/types";
import { toast } from "react-toastify";
import Dialog from "@/components/Dialog";
import dynamic from "next/dynamic";
const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checkedAll, setCheckEdAll] = useState<boolean>(true);
  const { cart } = useAppSelector(selectCart);
  const { cartItems } = cart;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any>(cartItems);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const changeQuantityHandle = (count: number, slug: string) => {
    const existItem: IInfoProduct = cartItems.find(
      (product: IInfoProduct) => product.item.slug === slug
    );

    const countInStock: Number = Number(existItem.item.countInStock);

    const quantityOrdered: Number = existItem.quantity as Number;

    try {
      if (count === 1 && quantityOrdered < countInStock) {
        dispatch(
          addProductToCart({
            item: { ...existItem.item },
            quantity: count,
            status: "ordered",
            totalPrice: undefined,
            yourSize: existItem.yourSize,
          })
        );

        toast.success("Cập nhập sản phẩm thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (count === -1 && Number(quantityOrdered) >= 1) {
        if (Number(quantityOrdered) === 1) {
          setShowModal(true);
          setSlug(slug);
        } else {
          dispatch(
            addProductToCart({
              item: { ...existItem.item },
              quantity: count,
              status: "ordered",
              totalPrice: undefined,
              yourSize: existItem.yourSize,
            })
          );
          toast.success("Cập nhập sản phẩm thành công", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }

      //setSelectedItems([...selectedItemsUpdateQuanlity]);
    } catch (error) {
      toast.success("Lỗi hệ thống !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const removeProductInCartHandle = (slug: string) => {
    setShowModal(false);
    dispatch(
      removeProductInCart({
        slug: slug,
      })
    );
  };

  const changeYourSizeHandle = (slug: string, size: string) => {
    try {
      dispatch(
        updateYourSize({
          slug: slug,
          size: size,
        })
      );
      toast.success("Cập nhập sản phẩm thành công", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.success("Lỗi hệ thống", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSelectedAll = () => {
    if (cartItems.length === selectedItems.length) {
      setCheckEdAll(false);
      setSelectedItems([]);
    } else {
      setCheckEdAll(true);
      setSelectedItems([...cartItems]);
    }
  };

  const handleSelectedItem = (slug: string) => {
    const isItemExistInSelectedItems = selectedItems.findIndex(
      (item: IInfoProduct) => item.item.slug === slug
    );
    if (isItemExistInSelectedItems == -1) {
      const newItem = cartItems.find(
        (item: IInfoProduct) => item.item.slug === slug
      );
      setSelectedItems([...selectedItems, newItem]);
      console.log("khong tim thay", selectedItems);
    } else {
      const newSelectedItems = selectedItems.filter(
        (product: IInfoProduct) => product.item.slug !== slug
      );

      setSelectedItems(newSelectedItems);
      setCheckEdAll(false);
    }
  };
  const totalCost = useMemo(() => {
    return selectedItems.reduce(
      (total: number, current: IInfoProduct) =>
        total + Number(current.totalPrice),
      0
    );
  }, [selectedItems, cartItems]);

  useEffect(() => {
    if (selectedItems) {
      const selectedItemsUpdatedQuantity = cartItems.filter(
        (product: IInfoProduct, index: number) =>
          product.item.slug === selectedItems[index].item.slug
      );
      setSelectedItems([...selectedItemsUpdatedQuantity]);
    }
  }, [cartItems]);

  useEffect(() => {
    console.log("selectedItems: ", selectedItems);

    setTotalPrice(totalCost);
  }, [selectedItems]);
  return (
    <Layout title="Your cart">
      {showModal ? (
        <Dialog
          slug={slug}
          accept={() => removeProductInCartHandle(slug)}
          setShowModal={setShowModal}
          content="Bạn chắc chắn muốn xóa sản phẩm"
          title="Thông báo"
        />
      ) : null}

      <div className=" bg-slate-100">Shopping cart</div>
      {cartItems.length == 0 ? (
        <div>Cart Empty</div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto flex sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full  py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        <div className="flex items-center h-5">
                          <input
                            id="hs-table-checkbox-all"
                            type="checkbox"
                            className="border-gray-200 rounded text-white focus:ring-blue-500 bg-black"
                            onChange={() => handleSelectedAll()}
                            checked={checkedAll}
                          />
                          <label
                            htmlFor="hs-table-checkbox-all"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Thành tiền
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((product: IInfoProduct) => (
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500"
                        key={product.item.slug}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <div className="flex flex-row">
                            <div className="flex items-center h-5">
                              <input
                                onChange={() =>
                                  handleSelectedItem(product.item.slug)
                                }
                                checked={
                                  selectedItems.findIndex(
                                    (pro: IInfoProduct) =>
                                      pro.item.slug == product.item.slug
                                  ) === -1
                                    ? false
                                    : true
                                }
                                value={product.item.slug}
                                id="hs-table-checkbox-1"
                                type="checkbox"
                                className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              />
                              <label
                                htmlFor="hs-table-checkbox-1"
                                className="sr-only"
                              >
                                Checkbox
                              </label>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex flex-row ">
                            <Link href={`/product/${product.item.slug}`}>
                              <Image
                                src={product.item.images[0]}
                                width={150}
                                height={150}
                                alt={product.item.name}
                              />
                            </Link>
                            <div className="flex flex-col justify-center ml-5">
                              <Link href={`/product/${product.item.slug}`}>
                                <span className="font-bold md:text-lg text-gray-500">
                                  {product.item.name}
                                </span>
                              </Link>
                              {product.item.sizes && (
                                <>
                                  <span className="uppercase text-gray-300 ">
                                    <select
                                      defaultValue={product.yourSize}
                                      className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg p-2.5 uppercase"
                                      onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                      ) =>
                                        changeYourSizeHandle(
                                          product.item.slug,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {product.item.sizes.map((size) => (
                                        <option key={size} value={size}>
                                          {size}
                                        </option>
                                      ))}
                                    </select>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className=" px-6 py-4">
                          {product.item.sale === 0 ? (
                            <span className=" after:font-medium  text-gray-500 text-xs">
                              {product.item.price} vnd/1 sản phẩm
                            </span>
                          ) : (
                            <span className=" line-through after:font-medium  text-gray-500 text-xs">
                              {product.item.price} vnd/1 sản phẩm
                            </span>
                          )}

                          <br></br>
                          <span className="uppercase font-medium">
                            {product.totalPrice} vnd
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center justify-center border rounded-md">
                            <button
                              className="bg-white w-full text-xl hover:bg-red-400 rounded-l-md px-2 py-1"
                              onClick={() =>
                                changeQuantityHandle(-1, product.item.slug)
                              }
                            >
                              -
                            </button>
                            <input
                              className="font-semibold w-9 text-gray-700 text-center text-lg focus:outline-none"
                              value={product.quantity}
                              readOnly={true}
                            ></input>
                            <button
                              className="bg-white w-full text-xl hover:bg-red-400 rounded-r-md px-2 py-1"
                              onClick={() =>
                                changeQuantityHandle(1, product.item.slug)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex flex-row">{product.status}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-stone-100 px-8 py-7">
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {selectedItems.length}
                </span>
                <span className="font-semibold text-sm">{totalPrice} vnd</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>$600</span>
                </div>
                <button
                  disabled={selectedItems.length === 0 ? true : false}
                  // Always do navigations after the first render
                  onClick={() => router.push("/user/shipping")}
                  className=" font-semibold  py-3 text-sm text-white uppercase w-full primary-button"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
