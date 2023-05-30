import React, { useState, useEffect, useCallback } from "react";
import { Tab } from "@headlessui/react";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { selectCart } from "@/utils/slice";
import { useAppSelector } from "@/utils/hooks";
import EmptyCart from "@/components/EmptyCart";

import InfoDelive from "@/components/ShippingWard/InfoDelive";
import Payment from "@/components/ShippingWard/Payment";
import PlacedOder from "@/components/ShippingWard/placedOrder";
const Shipping = () => {
  const { cart, shippingWards } = useAppSelector(selectCart);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const indexActive = shippingWards.tabActive;

  let [categories] = useState([
    "Thông tin vận chuyển",
    "Phương thức thanh toán",
    "Đặt hàng",
  ]);

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

  const changeTab = (e: number) => {
    if (e <= indexActive) setSelectedIndex(e);
  };

  useEffect(() => {
    setSelectedIndex(indexActive);
  }, [indexActive, shippingWards]);

  return (
    <Layout title="Thông tin đặt hàng">
      {cart.cartItems.length === 0 ? (
        <>
          <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
              <EmptyCart />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full  px-2 py-16 sm:px-0">
          <Tab.Group selectedIndex={selectedIndex} onChange={changeTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {categories.map((category, index: number) => (
                <Tab
                  disabled={indexActive < index}
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white bg-black",
                      "ring-white  focus:outline-none focus:ring-2",
                      selected || index < selectedIndex || indexActive < index
                        ? "bg-white !text-black "
                        : "text-white hover:bg-white hover:text-black"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <InfoDelive />
              </Tab.Panel>
              <Tab.Panel>
                <Payment setSelectedIndex={setSelectedIndex} />
              </Tab.Panel>
              <Tab.Panel>
                <PlacedOder />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
