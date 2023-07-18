import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";

interface IFilledProps {
  name: string;
  defaultValue?: string;
  label: string;
}
const Filled: React.FC<IFilledProps> = ({ name, defaultValue, label }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const messageErrors = errors[name]?.message;
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            {...register(name)}
            label={label}
            id="filled-basic"
            variant="filled"
            helperText={`${messageErrors}`}
          />
        )}
        control={control}
        name="select"
        defaultValue={defaultValue}
      />
    </Box>
  );
};

export default Filled;
