import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
enum ETypes {
  submit = "submit",
  button = "button",
}
enum EColors {
  secondary = "secondary",
  success = "success",
  error = "error",
}

type ColorType = keyof typeof EColors;
type ButtonType = keyof typeof ETypes;

interface IContainerButtonProp {
  type: ButtonType;
  color: ColorType;
  title: string;
  disabled?: boolean;
}
const TextButton: React.FC<IContainerButtonProp> = ({
  type,
  color,
  title,
  disabled,
}) => {
  return (
    <Stack spacing={1} direction="row">
      <Button type={type} color={color} disabled={disabled} variant="text">
        {title}
      </Button>
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(TextButton), { ssr: false });
