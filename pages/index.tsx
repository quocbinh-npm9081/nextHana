import Head from "next/head";
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import CarouselBanner from "@/components/CarouselBanner";
import data from "@/utils/data";
import ProductItem from "@/components/ProductItem";
import CategoryItem from "@/components/CategoryItem";

export default function Home() {
  return (
    <Layout title="Hana Store">
      <CarouselBanner banners={data.banners} />
      <Grid>
        {data.categories.map((category) => (
          <CategoryItem category={category} key={category.slug} />
        ))}
      </Grid>
      <div className="mt-36 p-5 flex justify-center items-center">
        <h2 className="font-bold sm:text-2xl md:text-3xl ">
          Sản phẩm đang được giảm giá
        </h2>
      </div>
      <Grid>
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </Grid>
    </Layout>
  );
}
