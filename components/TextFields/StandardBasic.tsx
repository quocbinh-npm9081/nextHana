import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";

interface IStandardBasicProps {
  name: string;
  defaultValue?: string;
  label: string;
}

const StandardBasic: React.FC<IStandardBasicProps> = ({
  name,
  defaultValue,
  label,
}) => {
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
            id="standard-basic"
            variant="standard"
            helperText={messageErrors ? `${messageErrors}` : ""}
          />
        )}
        control={control}
        name="select"
        defaultValue={defaultValue}
      />
    </Box>
  );
};

export default  StandardBasic;
