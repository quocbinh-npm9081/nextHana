import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Layout from "@/components/Layout";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { selectCart } from "@/utils/slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart";

import InfoDelive from "@/components/ShippingWard/InfoDelive";
import Payment from "@/components/ShippingWard/Payment";

const Shipping = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  let [categories] = useState([
    "Thông tin vận chuyển",
    "Phương thức thanh toán",
    "Đặt hàng",
  ]);

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

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
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {categories.map((category, index: number) => (
                <Tab
                  //disabled={selectedIndex === 2 ? true : false}
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white bg-black",
                      "ring-white   focus:outline-none focus:ring-2",
                      selected || index < selectedIndex
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
                <InfoDelive
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Payment />
              </Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
