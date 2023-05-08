import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface IProps {
  activeSet?: number;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckoutWizard({ activeSet = 0 }: IProps) {
  const [selectedIndex, setSelectedIndex] = useState(activeSet);

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
                  <h2 className="font-semibold text-xl text-gray-600">
                    Thông tin vận chuyển
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Thông tin này sẽ được Hana lưu trữ nhằm mục đích vận chuyển
                    nhanh và chính xác
                  </p>

                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <p>Please fill out all the fields.</p>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-5">
                            <label htmlFor="name">Tên người đặt hàng</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value=""
                            />
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="phonenumber">Số điện thoại</label>
                            <input
                              type="text"
                              name="phonenumber"
                              id="phonenumber"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value=""
                              placeholder="03267..."
                            />
                          </div>

                          <div className="md:col-span-3">
                            <label htmlFor="address">
                              Địa chỉ / Số nhà/ Tên đường
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value=""
                              placeholder=""
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label htmlFor="village">Xã /phường</label>

                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                name="village"
                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="village"
                              >
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
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
                          <div className="md:col-span-2">
                            <label htmlFor="district">Quận/ Huyện</label>
                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                name="district"
                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="district"
                              >
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
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
                          <div className="md:col-span-2">
                            <label htmlFor="province">Tỉnh</label>
                            <div className="relative h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                              <select
                                name="province"
                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                id="province"
                              >
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
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

                          <div className="md:col-span-2">
                            <label htmlFor="city">Thành Phố</label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value=""
                              placeholder=""
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                              type="text"
                              name="zipcode"
                              id="zipcode"
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder=""
                              value=""
                            />
                          </div>
                          {/* 
                          <div className="md:col-span-5">
                            <div className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="billing_same"
                                id="billing_same"
                                className="htmlForm-checkbox"
                              />
                              <label htmlFor="billing_same" className="ml-2">
                                My billing address is different than above.
                              </label>
                            </div>
                          </div> */}

                          <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Tiếp
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
}
