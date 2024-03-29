import React, { useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  saveInfoAndChangeTabShipping,
  changeTabGroupShipping,
  selectCart,
} from "@/utils/slice";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/utils/hooks";
interface IPlan {
  id: string;
  name: string;
  logo: string;
}

interface IProps {
  handleComplete: () => void;
  plans: React.MutableRefObject<IPlan[]>;
}

function ButtonGroup({ plans, handleComplete }: IProps) {
  const { shippingWards } = useAppSelector(selectCart);

  const methods = useFormContext();
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    const dataAction = {
      type: "SAVE_PAYMENT_METHOD",
      data: {
        method: data,
        index: 2,
      },
    };

    try {
      dispatch(saveInfoAndChangeTabShipping(dataAction));
      handleComplete();
      toast.success("Đặt hàng thành công !", {
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
      console.log(error);
    }
  };

  const routerBack = () => dispatch(changeTabGroupShipping(0));

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            {plans.current.map((method, index: number) => (
              <label
                key={index}
                className={
                  method.id == "thanhtoanbangmomo"
                    ? "hidden"
                    : " flex flex-row items-center mb-4 p-4 border-2 border-gray-400 cursor-pointer"
                }
                htmlFor={String(method.id)}
              >
                <input
                  {...methods.register("hana_paymentMethod")}
                  value={String(method.id)}
                  id={String(method.id)}
                  type="radio"
                />
                <Image
                  alt="logo"
                  src={String(method.logo)}
                  width={54}
                  height={54}
                  title="logo"
                />
                <span className="text-sm font-semibold ">{method.name}</span>
              </label>
            ))}
          </div>
          <div className="md:col-span-5 text-right absolute    right-0 bottom-0">
            <div className="inline-flex items-end">
              <button
                type="submit"
                className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
              >
                Đặt hàng
              </button>
            </div>
          </div>{" "}
        </form>
        <div className="inline-flex items-end absolute left-0 bottom-0">
          <button
            onClick={() => routerBack()}
            className="bg-slate-400 hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          >
            Trở lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonGroup;
