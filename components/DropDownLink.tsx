import React from "react";
import Link from "next/link";
interface IProps {
  href: string;
  children: any;
  active: boolean;
}

const DropDownLink = (props: IProps, ref: any) => {
  const { href, children, active, ...rest } = props;
  return (
    <Link
      {...ref}
      {...rest}
      className={`${
        active ? "bg-black text-white" : "text-gray-900"
      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default React.forwardRef(DropDownLink);
