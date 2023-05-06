import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const shemaLogin = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Vui lòng nhập số điện thoại chính xác !")
      .required("Vui lòng nhập số điện thoại !")
      .min(10, "Vui lòng nhập số điện thoại chính xác !")
      .max(12, "Vui lòng nhập số điện thoại chính xác !"),
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
  } = useForm({ resolver: yupResolver(shemaLogin) });

  const onSubmit = async (data: any) => {
    const { phoneNumber, password } = data;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        phoneNumber,
        password,
      });
      const signInErrorInfo: SignInResponse | undefined = result;
      if (signInErrorInfo?.error) {
        reset({
          password: "",
        });
        toast.error(String(signInErrorInfo?.error), {
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
      console.log("result: ", signInErrorInfo?.error);
    } catch (err) {
      toast.error(String(err), {
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
  useEffect(() => {
    if (session?.user) {
      console.log("session?.user: ", session?.user);

      router.push("/");
    }
  }, [router, session]);

  return (
    <Layout title="Login">
      <div
        className="min-w-screen min-h-screen  mx-auto flex items-center justify-center overflow-hidden"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${data.backgrounds.loginPage[0].image} )`,
        }}
      >
        <form
          className="bg-white max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            />
            {errors.password?.message ? (
              <p className="text-red-500 text-xs italic">
                {String(errors.password?.message)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4 flex flex-row items-center justify-start">
            <input
              className="shadow border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-1"
              id="remember"
              type="checkbox"
              placeholder="remember"
            />
            <label
              className="block text-gray-700 text-sm font-bold "
              htmlFor="remember"
            >
              Nhớ tài khoản này
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="primary-button mr-4" type="submit">
              Đăng nhập
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-slate-900 hover:text-slate-500"
              href="#"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div className="mt-8 text-center">
            <Link href="/user/register" legacyBehavior>
              <a className="block text-slate-900 hover:text-slate-400 text-sm font-medium mb-2">
                Bạn chưa có tài khoản? Đăng kí
              </a>
            </Link>
          </div>
        </form>
      </div>{" "}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
