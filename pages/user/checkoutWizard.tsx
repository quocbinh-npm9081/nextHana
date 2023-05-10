import { useEffect, useLayoutEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import dynamic from "next/dynamic";

interface IProps {
  activeSet?: number;
  provinces: any;
}

interface IProvince {
  code: number;
  name: string;
  districts: any[];
  division_type: string;
  codename: string;
  phone_code: number;
}

const CheckoutWizard = ({ activeSet = 0, data }: any) => {
  const { data: session, status } = useSession();

  const [selectedIndex, setSelectedIndex] = useState(activeSet);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  let [categories] = useState({
    "Thông tin vận chuyển": [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    "Phương thức thanh toán": [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    "Đặt hàng": [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const shemaLogin = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Vui lòng nhập số điện thoại chính xác !")
      .required("Vui lòng nhập số điện thoại !")
      .min(10, "Vui lòng nhập số điện thoại chính xác !")
      .max(13, "Vui lòng nhập số điện thoại chính xác !"),
    name: yup
      .string()
      .required("Vui lòng nhập tên đầy đủ !")
      .max(12, "Tên không được dài quá 12 kí tự !"),
    address: yup
      .string()
      .required("Vui lòng nhập địa chỉ nhận hàng !")
      .min(8, "Địa chỉ nhận hàng không hợp lệ !"),
    province: yup
      .number()
      .required("Tỉnh thành không được bỏ trống không được bỏ trống !"),
    district: yup.string().required("Quận huyện không được bỏ trống !"),
    ward: yup.string().required("Xã phường không được bỏ trống !"),
  });

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shemaLogin),
    defaultValues: {
      name: session?.user.name ? `${session?.user.name}` : "",
      phoneNumber: "",
      address: "",
      province: 0,
      district: "",
      ward: "",
    },
  });
  const { name, phoneNumber, address, province, district, ward } = watch();

  const errorsMessage = Object.keys(errors).map(
    (key, index: number) => errors[key as keyof typeof errors]
  );

  const onSubmit = (data: any) => {
    console.log("onSubmit: ", data);
  };

  useEffect(() => {
    async function getProvinces() {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/");

        setProvinces(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProvinces();
    return () => {
      getProvinces();
    };
  }, []);

  useEffect(() => {
    resetField("district");
    if (province != 0) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${province}?depth=2`)
        .then(function (response) {
          const { districts } = response.data;
          setDistricts(districts);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }, [province]);

  useEffect(() => {
    resetField("ward");

    if (province != 0 || district != "") {
      axios
        .get(`https://provinces.open-api.vn/api/p/${province}?depth=3`)
        .then(function (response) {
          const { districts } = response.data;
          const yourDistrict = districts.find(
            (item: any) => item.name == district
          );

          const { wards } = yourDistrict;

          setWards(wards);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }, [district]);

  return (
    <div className="w-full  px-2 py-16 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category, index: number) => (
            <Tab
              key={category}
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
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
              <div className="container max-w-screen-lg mx-auto">
                <div>
                  <h2 className="font-semibold text-xl text-gray-600 pb-4">
                    Thông tin vận chuyển
                  </h2>

                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="flex flex-col item-center justify-start">
                        {errorsMessage.length === 0 ? (
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
                              Thông tin này sẽ được Hana lưu trữ nhằm mục đích
                              vận chuyển nhanh và chính xác
                            </div>
                          </div>
                        ) : (
                          <>
                            {errorsMessage.map((msg, index: number) => (
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
                                <div>{msg?.message}</div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                      <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:col-span-2"
                      >
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          {/* NAME */}
                          <div className="md:col-span-5">
                            <label htmlFor="name">Tên người đặt hàng</label>
                            <input
                              aria-label="name"
                              autoFocus
                              {...register("name")}
                              type="text"
                              name="name"
                              id="name"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                          </div>

                          {/* PHONE NUMBER */}
                          <div className="md:col-span-5">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                              aria-label="phoneNumber"
                              type="text"
                              {...register("phoneNumber")}
                              name="phoneNumber"
                              id="phoneNumber"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="03267..."
                            />
                          </div>

                          {/* ADDRESS */}
                          <div className="md:col-span-3">
                            <label htmlFor="address">
                              Địa chỉ / Số nhà/ Tên đường
                            </label>
                            <input
                              aria-label="address"
                              {...register("address")}
                              type="text"
                              name="address"
                              id="address"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder=""
                            />
                          </div>

                          {/* PROVINCE */}
                          <div className="md:col-span-2">
                            <label htmlFor="province">Tỉnh</label>
                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                aria-label="province"
                                {...register("province")}
                                name="province"
                                className="h-full px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="province"
                              >
                                <option disabled={true} value={0}>
                                  --- Chọn tỉnh thành
                                </option>
                                {provinces.map(
                                  (item: IProvince, index: number) => (
                                    <option key={item.code} value={item.code}>
                                      {item.name}
                                    </option>
                                  )
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* DISTRICT */}
                          <div className="md:col-span-2">
                            <label htmlFor="district">
                              Quận/ Huyện/ Thị Xã
                            </label>
                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                aria-label="district"
                                {...register("district")}
                                name="district"
                                className="h-full px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="district"
                                disabled={districts.length === 0 ? true : false}
                              >
                                <option disabled={true} value="">
                                  --- Chọn quận huyện
                                </option>
                                {districts.map((item, index: number) => (
                                  <option value={item.name} key={index}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* WARDS */}
                          <div className="md:col-span-2">
                            <label htmlFor="ward">Xã /phường</label>

                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                aria-label="ward"
                                {...register("ward")}
                                name="ward"
                                className="h-full px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="ward"
                                disabled={
                                  wards.length === 0 || district === ""
                                    ? true
                                    : false
                                }
                              >
                                <option disabled={true} value="">
                                  --- Chọn xã phường
                                </option>
                                {wards.map((item: any, index: number) => (
                                  <option value={item.name} key={index}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                              <button className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded">
                                Tiếp
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default dynamic(() => Promise.resolve(CheckoutWizard), { ssr: false });
