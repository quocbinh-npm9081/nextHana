import { useAppSelector } from "@/utils/hooks";
import { selectCart } from "@/utils/slice";
import Image from "next/image";
const PlacedOder = () => {
  const { cart, shippingWards } = useAppSelector(selectCart);
  const { cartItems } = cart;
  // const { userInfo } = shippingWards;
  console.log({ cart, shippingWards });
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
          <Image
            fill
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
            alt="image"
            className="h-full w-full object-center object-cover"
          />
        </div>

        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Đặt hàng thành công !
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Cảm ơn bạn đã mua hàng
              </p>
              <p className="mt-2 text-base text-gray-500">
                Hana chân thành cảm ơn đơn đặt hàng của bạn, chúng tôi hiện đang
                xử lý nó. Vì vậy, hãy chờ đợi và chúng tôi sẽ sớm xác nhận!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Mã đơn hàng:</dt>
                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
              >
                {cartItems.map((product: any, index: number) => (
                  <li key={index} className="flex py-6 space-x-6">
                    <Image
                      placeholder="blur"
                      width={24}
                      height={24}
                      src={product.item.images[0]}
                      alt={product.item.images[0]}
                      className="flex-none h-24 w-24 bg-gray-100 rounded-md object-center object-cover"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <a href={product.href}>{product.item.name}</a>
                      </h3>
                      <p>Số lượng: {product.quantity}</p>
                      <p className="capitalize">
                        {" "}
                        {product.yourColor ? product.yourColor : ""}
                      </p>
                      <p>Size: {product.yourSize}</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      Tổng giá: {product.totalPrice}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <dt>Tổng giá sản phẩm: </dt>
                  <dd className="text-gray-900">$72.00</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Phí vận chuyển: </dt>
                  <dd className="text-gray-900">$8.00</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                  <dt className="text-base">Tổng giá trị đơn hàng:</dt>
                  <dd className="text-base">$86.40</dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Địa chỉ nhận hàng
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">Kristin Watson</span>
                      <span className="block">7363 Cynthia Pass</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Phương thức thanh toán
                  </dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                    <div className="flex-none">
                      <svg
                        aria-hidden="true"
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-auto"
                      >
                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                        <path
                          d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          fill="#fff"
                        />
                      </svg>
                      <p className="sr-only">Visa</p>
                    </div>
                    <div className="flex-auto">
                      <p className="text-gray-900">Ending with 4242</p>
                      <p>Expires 12 / 21</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default PlacedOder;
