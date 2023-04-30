import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import data from "@/utils/data";
import BreakCrumb from "@/components/BreakCrumb";
import ProductDetail from "@/components/ProductDetail";
const Product = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((p) => p.slug == slug);

  return (
    <Layout title={product && product.name ? product.name : "NOT FOUND"}>
      {product && product.name ? (
        <>
          <BreakCrumb
            image="/static/images/breakcrumbs/breadcrumb-bg-1.png"
            title="Hana store"
          ></BreakCrumb>
          <ProductDetail product={product} />
        </>
      ) : (
        <h1>NOT FOUND</h1>
      )}
    </Layout>
  );
};

export default Product;
