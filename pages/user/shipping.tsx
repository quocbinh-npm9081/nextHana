import React from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "./checkoutWizard";
const Shipping = () => {
  return (
    <Layout title="Thông tin đặt hàng">
      <CheckoutWizard></CheckoutWizard>
    </Layout>
  );
};

export default Shipping;
