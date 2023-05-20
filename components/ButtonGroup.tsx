import React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { saveaPaymentMethod } from "@/utils/slice";
import { useAppDispatch } from "@/utils/hooks";
interface IPlan {
  id: string;
  name: string;
  logo: string;
}

interface IProps {
  plans: React.MutableRefObject<IPlan[]>;
}

function ButtonGroup({ plans }: IProps) {
  const methods = useFormContext();
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    dispatch(saveaPaymentMethod(data));
  };
  console.log(methods.formState.errors);

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
                />
                <span className="text-sm font-semibold ">{method.name}</span>
              </label>
            ))}
          </div>
          <div className="md:col-span-5 text-right absolute right-0 bottom-0">
            <div className="inline-flex items-end">
              <button className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded">
                Tiếp tục
              </button>
            </div>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}

export default ButtonGroup;
