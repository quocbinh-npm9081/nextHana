import React, { useRef } from "react";
import ButtonGroup from "../ButtonGroup";
import FormProviderWrapper from "../Form/FormProviderWrapper";
import { paymentMethods } from "@/utils/types";

import * as yup from "yup";
interface IProps {
  setSelectedIndex: (e: number) => any;
}
const Payment = ({ setSelectedIndex }: IProps) => {
  const plans = useRef([
    {
      id: "thanhtoankhinhanhang",
      name: paymentMethods.thanhtoankhinhanhang,
      logo: "https://developers.momo.vn/v3/vi/img/logo.svg",
    },
    {
      id: "thanhtoanbangmomo",
      name: paymentMethods.thanhtoanbangmomo,
      logo: "https://developers.momo.vn/v3/vi/img/logo.svg",
    },
  ]);

  const shemaRadioGroup = yup.object().shape({
    hana_paymentMethod: yup
      .string()
      .oneOf(["thanhtoankhinhanhang"], "Chức năng chưa được phát triển")
      .required("Vui lòng chọn phương thức thanh toán"),
  });
  const defaultValues = { hana_paymentMethod: "thanhtoankhinhanhang" };

  return (
    <div className=" p-6 bg-gray-100 flex items-start justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 pb-4">
            Thông tin vận chuyển
          </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="relative grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
              <FormProviderWrapper
                defaultValues={defaultValues}
                validation={shemaRadioGroup}
              >
                <ButtonGroup
                  setSelectedIndex={setSelectedIndex}
                  plans={plans}
                />
              </FormProviderWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
