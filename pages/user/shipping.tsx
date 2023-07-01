import React from "react";

import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { selectCart } from "@/utils/slice";
import { useAppSelector } from "@/utils/hooks";
import EmptyCart from "@/components/EmptyCart";

import PlaceOrderStepStatus from "@/components/ShippingWard/PlaceOrderStepStatus";

const Shipping = () => {
  const { cart } = useAppSelector(selectCart);
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
          <PlaceOrderStepStatus />
        </div>
      )}
    </Layout>
  );
};
{
  /* <InfoDelive />
                <Payment setSelectedIndex={setSelectedIndex} />
                <PlacedOder /> */
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
