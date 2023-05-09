import React from "react";
import Link from "next/link";

interface IItem {
  title?: string;
  href: string;
  clickHandle?: any;
}
interface IProps {
  item: IItem;
  active: boolean;
  children: any;
}

const DropDownLink = (props: IProps, ref: any) => {
  const { item, children, active, ...rest } = props;

  const { href, clickHandle } = item;
  return (
    <Link
      {...ref}
      {...rest}
      className={`${
        active ? "bg-black text-white" : "text-gray-900"
      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
      href={href}
      onClick={clickHandle ? clickHandle : undefined}
    >
      {children}
    </Link>
  );
};

export default React.forwardRef(DropDownLink);
