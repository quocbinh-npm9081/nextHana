import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropDownLink from "./DropDownLink";
import { signOut } from "next-auth/react";

interface IProps {
  title: string;
}

function MenuUserDropDown({ title }: IProps) {
  const menuItems = useRef([
    { title: "Thông tin cá nhân", href: "user/profile" },
    { title: "Lịch sử mua hàng", href: "user/order-history" },
    {
      title: "Đăng xuất",
      href: "#",
      clickHandle: () => signOut({ callbackUrl: "/" }),
    },
  ]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {title}
        <MdKeyboardArrowDown />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-2">
            {menuItems.current.map((item, index) => (
              <Menu.Item key={item.href + index}>
                {({ active }) => (
                  <DropDownLink active={active} item={item}>
                    {item.title}
                  </DropDownLink>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MenuUserDropDown;
