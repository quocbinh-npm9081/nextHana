import React from "react";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInResponse, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import data from "@/utils/data";
const Login = () => {
  const router = useRouter();
  const redirectURL = router.query.callbackUrl as string;
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
        callbackUrl: redirectURL ? redirectURL : "/",
      });
      const status: SignInResponse | undefined = result;
      if (status?.error) {
        reset({
          password: "",
        });
        toast.error(String(status?.error), {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else router.push(String(status?.url));
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

  //useEffect(() => {
  //   if (session?.user) {
  //     if (redirect) router.push(String(redirect));
  //     else router.push("/");
  //   }
  // }, [router, session]);

  return (
    <Layout title="Login">
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
          {/* <div className="mb-4 flex flex-row items-center justify-start">
            <input
              className="shadow border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-1"
              id="remember"
              type="checkbox"
              placeholder="remember"
            />
            <label
              className="block text-gray-700 text-sm font-bold "
              htmlFor="remember"
              id="remember"
            >
              Nhớ tài khoản này
            </label>
          </div> */}
          <div className="flex items-center justify-between">
            <button className="primary-button mr-4" type="submit">
              Đăng nhập
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-slate-900 hover:text-slate-500"
              href="#"
            >
              Quên mật khẩu?
            </a> */}
          </div>
          <div className="mt-8 text-center">
            <Link href="/user/register" legacyBehavior>
              <a className="block text-slate-900 hover:text-slate-400 text-sm font-medium mb-2">
                Bạn chưa có tài khoản? Đăng kí
              </a>
            </Link>
          </div>
          {/* <div className="mt-8 flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
              <hr className="w-full border-gray-400" />
              <span className="p-1 text-sm text-gray-400 mb-1">Hoặc</span>
              <hr className="w-full  border-gray-400" />
            </div>

            <div className="cursor-pointer m-2">
              <BsFacebook
                size={40}
                color="#039BE5"
                onClick={() =>
                  signIn("facebook", {
                    callbackUrl: redirectURL ? redirectURL : "/",
                  })
                }
              />
            </div>
          </div> */}
        </form>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
