import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectCart, saveInfoAndChangeTabShipping } from "@/utils/slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import dynamic from "next/dynamic";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
interface IProvince {
  code: number;
  name: string;
  districts: any[];
  division_type: string;
  codename: string;
  phone_code: number;
}
const InfoDelive = () => {
  const dispatch = useAppDispatch();
  const { loading, shippingWards } = useAppSelector(selectCart);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const { userInfo } = shippingWards;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const shemaLogin = yup.object().shape({
    hana_phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Vui lòng nhập số điện thoại chính xác !")
      .required("Vui lòng nhập số điện thoại !")
      .min(10, "Vui lòng nhập số điện thoại chính xác !")
      .max(13, "Vui lòng nhập số điện thoại chính xác !"),
    hana_name: yup
      .string()
      .required("Vui lòng nhập tên đầy đủ !")
      .max(12, "Tên không được dài quá 12 kí tự !"),
    hana_address: yup
      .string()
      .required("Vui lòng nhập địa chỉ nhận hàng !")
      .min(8, "Địa chỉ nhận hàng không hợp lệ !"),
    hana_proviincee: yup.object().shape({
      value: yup.number().moreThan(0, "Tỉnh thành không được bỏ trống !"),
    }),
    hana_district: yup.object().shape({
      value: yup.number().moreThan(0, "Quận huyện không được bỏ trống !"),
    }),
    hana_ward: yup.object().shape({
      value: yup.number().moreThan(0, "Xã phường không được bỏ trống  !"),
    }),
  });
  const router = useRouter();
  const {
    control,
    handleSubmit,

    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shemaLogin),
    defaultValues: {
      hana_name: userInfo?.name ? userInfo.name : "",
      hana_phoneNumber: userInfo?.phoneNumber ? userInfo.phoneNumber : "",
      hana_address: userInfo?.address ? userInfo.address : "",
      hana_proviincee: userInfo?.province
        ? userInfo.province
        : { label: "-- Chọn tỉnh thành", value: 0, isDisabled: true },
      hana_district: userInfo?.district
        ? userInfo.district
        : { label: "-- Chọn quận huyện", value: 0, isDisabled: true },
      hana_ward: userInfo?.ward
        ? userInfo.ward
        : { label: "-- Chọn xã phường", value: 0, isDisabled: true },
    },
  });
  const { hana_proviincee, hana_district } = watch();
  const errorsMessageInputText = Object.keys(errors)
    .map((key: string) => {
      if (
        key === "hana_name" ||
        key === "hana_phoneNumber" ||
        key === "hana_address"
      ) {
        return errors[key as keyof typeof errors];
      }
    })
    .filter((err: any) => err != undefined);
  const errorsMessageSelecteBox = Object.keys(errors)
    .map((key: string) => {
      if (
        key === "hana_proviincee" ||
        key === "hana_district" ||
        key === "hana_ward"
      ) {
        return errors[key as keyof typeof errors];
      }
    })
    .filter((err: any) => err != undefined);

  const onSubmit = (data: any) => {
    const dataAction = {
      type: "SAVE_USER_INFO",
      data: {
        user: {
          hana_name: data.hana_name,
          hana_phoneNumber: data.hana_phoneNumber,
          hana_address: data.hana_address,
          hana_proviincee: data.hana_proviincee,
          hana_district: data.hana_district,
          hana_ward: data.hana_ward,
        },
        index: 1,
      },
    };
    try {
      dispatch(saveInfoAndChangeTabShipping(dataAction));
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/")
      .then(function (response) {
        const provinces = response.data.map((item: IProvince) => {
          return { value: item.code, label: item.name };
        });

        setProvinces(provinces);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    if (hana_proviincee.value != 0) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${hana_proviincee.value}?depth=2`
        )
        .then(function (response) {
          const districts = response.data.districts.map((item: any) => {
            return { value: item.code, label: item.name };
          });
          setDistricts(districts);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }, [hana_proviincee]);

  useEffect(() => {
    if (hana_proviincee.value != 0 && hana_district.value != 0) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${hana_proviincee.value}?depth=3`
        )
        .then(function (response) {
          const { districts } = response.data;

          const district = districts.find(
            (item: any) => item.code == hana_district.value
          );

          const wards = district.wards.map((item: any) => {
            return { value: item.code, label: item.name };
          });

          setWards(wards);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }, [hana_district, hana_proviincee]);

  return (
    <div className=" p-6 bg-gray-100 flex items-start justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 pb-4">
            Thông tin vận chuyển
          </h2>

          <div className="bg-white  rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="relative grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="relative flex flex-col item-center justify-start">
                {errorsMessageInputText.length === 0 ? (
                  <div
                    className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      Thông tin này sẽ được Hana lưu trữ nhằm mục đích vận
                      chuyển nhanh và chính xác
                    </div>
                  </div>
                ) : (
                  <>
                    {errorsMessageInputText.map((msg, index: number) => (
                      <div
                        key={index}
                        className="flex p-4 h-min mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                        role="alert"
                      >
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 inline w-5 h-5 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>{String(msg?.message)}</div>
                      </div>
                    ))}
                  </>
                )}
                {errorsMessageSelecteBox.map((msg, index: number) => (
                  <div
                    key={index}
                    className="flex p-4 h-min mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>{String(msg?.value.message)}</div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="nope"
                className="lg:col-span-2"
              >
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  {/* NAME */}
                  <div className="md:col-span-5">
                    <label htmlFor="hana_name">Tên người đặt hàng</label>
                    <Controller
                      control={control}
                      name="hana_name"
                      render={({ field }) => {
                        return (
                          <input
                            {...field}
                            autoFocus
                            type="text"
                            id="hana_name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        );
                      }}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="md:col-span-5">
                    <label htmlFor="hana_phoneNumber">Số điện thoại</label>
                    <Controller
                      control={control}
                      name="hana_phoneNumber"
                      render={({ field }) => {
                        return (
                          <input
                            {...field}
                            type="text"
                            id="hana_phoneNumber"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="03267..."
                          />
                        );
                      }}
                    />
                  </div>

                  {/* ADDRESS */}
                  <div className="md:col-span-3">
                    <label htmlFor="hana_address">
                      Địa chỉ / Số nhà/ Tên đường
                    </label>
                    <Controller
                      control={control}
                      name="hana_address"
                      render={({ field }) => {
                        return (
                          <input
                            {...field}
                            type="text"
                            id="hana_address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="03267..."
                          />
                        );
                      }}
                    />
                  </div>

                  {/* PROVINCE */}
                  <div className="md:col-span-2">
                    <label htmlFor="hana_proviincee">Tỉnh</label>
                    <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <Controller
                        control={control}
                        name="hana_proviincee"
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              className="w-full"
                              options={provinces}
                              onChange={(e: any, actionMete: any) => {
                                setValue("hana_district", {
                                  label: "-- Chọn quận huyện",
                                  value: 0,
                                  isDisabled: true,
                                });
                                setValue("hana_ward", {
                                  label: "-- Chọn xã phường",
                                  value: 0,
                                  isDisabled: true,
                                });

                                field.onChange(e);
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* DISTRICT */}
                  <div className="md:col-span-2">
                    <label htmlFor="district">Quận/ Huyện/ Thị Xã</label>
                    <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <Controller
                        control={control}
                        name="hana_district"
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              className="w-full"
                              options={districts}
                              onChange={(e: any, actionMete: any) => {
                                setValue("hana_ward", {
                                  label: "-- Chọn xã phường",
                                  value: 0,
                                  isDisabled: true,
                                });

                                field.onChange(e);
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* WARD */}
                  <div className="md:col-span-2">
                    <label htmlFor="ward">Xã /phường</label>

                    <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <Controller
                        control={control}
                        name="hana_ward"
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              className="w-full"
                              options={wards}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className=" md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        disabled={loading ? true : false}
                        className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="absolute bottom-0 inline-flex items-end">
                <button
                  disabled={loading ? true : false}
                  className="bg-slate-400 hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.back()}
                >
                  Trở lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dynamic(() => Promise.resolve(InfoDelive), { ssr: false });
