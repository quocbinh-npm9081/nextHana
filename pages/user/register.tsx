import React from "react";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import data from "@/utils/data";
import { useRouter } from "next/navigation";

const Register = () => {
  const { push } = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const shemaRegister = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Vui lòng nhập số điện thoại chính xác !")
      .required("Vui lòng nhập số điện thoại !")
      .min(10, "Vui lòng nhập số điện thoại chính xác !")
      .max(12, "Vui lòng nhập số điện thoại chính xác !"),
    userName: yup
      .string()
      .required("Vui lòng nhập số tên của bạn !")
      .min(4, "Tên phải chứa ít nhất 8 kí tự !")
      .max(12, "Tên không quá 18 kí tự !"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu !")
      .min(8, "Mật khẩu phải chứa ít nhất 8 kí tự !")
      .max(32, "Mật khẩu không được lớn hơn 32 kí tự !"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shemaRegister) });

  const userRegister = async (data: any) => {
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  };

  const onSubmit = async (data: any) => {
    const results = await userRegister(data);
    if (results.status === 200) {
      toast.error(String(results.message), {
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
    if (results.status === 201) {
      toast.success(String(results.message), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      push("/events/minigame");
    }
  };

  return (
    <Layout title="Register">
      <div
        className="relative min-w-screen min-h-screen flex-col mx-auto flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${data.backgrounds.loginPage[0].image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <form
          className="absolute mx-auto bg-white max-w-xs shadow-md rounded px-8 pt-6 pb-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2 brandHana text-center">
              HANASTORE
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Số điện thoại
            </label>
            <input
              {...register("phoneNumber")}
              className={`${
                errors.phoneNumber?.message ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline`}
              id="phoneNumber"
              type="text"
              placeholder="Số điện thoại"
              autoComplete="on"
            />
            {errors.phoneNumber?.message ? (
              <p className="text-red-500 text-xs italic">
                {String(errors.phoneNumber?.message)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Tên của bạn
            </label>
            <input
              {...register("userName")}
              className={`${
                errors.userName?.message ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline`}
              id="userName"
              type="text"
              placeholder="Tên của bạn"
              autoComplete="on"
            />
            {errors.userName?.message ? (
              <p className="text-red-500 text-xs italic">
                {String(errors.userName?.message)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              {...register("password")}
              className={` ${
                errors.password?.message ? "border-red-500" : ""
              } shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              autoComplete="on"
            />
            {errors.password?.message ? (
              <p className="text-red-500 text-xs italic">
                {String(errors.password?.message)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="primary-button mr-4" type="submit">
              Đăng kí
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });
