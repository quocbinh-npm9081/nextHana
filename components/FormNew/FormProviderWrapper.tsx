import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";

const FormProviderWrapper = ({
  children,
  defaultValues,
  validation,
  onSubmit,
  isReset,
}: any) => {
  const methods = useForm({
    resolver: yupResolver(validation),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful && isReset) {
      methods.reset();
    }
  }, [methods.formState, methods.reset, methods, isReset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
export default dynamic(() => Promise.resolve(FormProviderWrapper), {
  ssr: false,
});
