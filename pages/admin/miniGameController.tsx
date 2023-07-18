import React, { useEffect, useState } from "react";
import FormProviderWrapper from "@/components/FormNew/FormProviderWrapper";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import StandardBasic from "@/components/TextFields/StandardBasic";
import ContainerButton from "@/components/Buttons/ContainerButton";
import { Box } from "@mui/material";
import LuckyVoucherTable from "@/components/Tables/LuckyVoucher/LuckyVoucherTable";
import UserOrderLuckyVoucherTable from "@/components/Tables/UserOrderLuckyVoucher/UserOrderLuckyVoucherTable";
import { toast } from "react-toastify";
const shema = yup.object().shape({
  name: yup.string().required("Tên voucher không được bỏ trống !"),
  content: yup.string().required("Mô tả voucher không được bỏ trống !"),
});
const defaultValues = {
  name: "",
  content: "",
};
type Inputs = {
  name: string;
  content: string;
};

const MiniGameController = () => {
  const [vouchers, setVouchers] = useState([]);
  const [userOrderVouchers, setUserOrderVouchers] = useState<any[]>([]);
  const [isDeletedVoucherSelected, setIsDeletedVoucherSelected] =
    useState<boolean>(false);
  const [isDeletedUserSelected, setIsDeletedUserSelected] =
    useState<boolean>(false);
  const getLuckyVoucher = async () => {
    const response = await fetch("/api/luckyVouchers");
    const { vouchers } = await response.json();
    setVouchers(vouchers);
  };

  const getUserOrderVouchers = async () => {
    const response = await fetch("/api/admin/userOrderVouchers");
    const { data } = await response.json();

    setUserOrderVouchers(data);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data post:", data);

    const addLuckyVoucher = async () => {
      const response = await fetch("/api/admin/addLuckyVoucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      await getLuckyVoucher();
    };
    addLuckyVoucher();
  };
  // console.log(watch("voucher")); // watch input value by passing the name of it

  useEffect(() => {
    getLuckyVoucher();
  }, [isDeletedVoucherSelected]);

  useEffect(() => {
    getUserOrderVouchers();
  }, [isDeletedUserSelected]);

  return (
    <div className="m-4">
      <FormProviderWrapper
        validation={shema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isReset={true}
      >
        <StandardBasic name="name" label="Tên voucher" />
        <StandardBasic name="content" label="Mô tả" />

        <ContainerButton title="Submit" color="success" type="submit" />
      </FormProviderWrapper>
      <Box sx={{ marginTop: 10 }}>
        <LuckyVoucherTable
          title="Danh sách voucher trong mini game"
          data={vouchers}
          setIsDeletedSelected={setIsDeletedVoucherSelected}
        />
      </Box>
      <Box sx={{ marginTop: 20 }}>
        <UserOrderLuckyVoucherTable
          title="Danh sách người trúng voucher"
          data={userOrderVouchers}
          setIsDeletedSelected={setIsDeletedUserSelected}
        />
      </Box>
    </div>
  );
};

export default MiniGameController;
