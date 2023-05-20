import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FormProviderWrapper = ({ children, defaultValues, validation }: any) => {
  const methods = useForm({
    resolver: yupResolver(validation),
    defaultValues: defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormProviderWrapper;
