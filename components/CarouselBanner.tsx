import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
interface Iprops {
  banners: any;
}
const CarouselBanner = ({ banners }: Iprops) => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner"
      >
        {banners.map((banner: any, index: number) => (
          <SwiperSlide key={banner.iamge + index}>
            <Image
              width={3080}
              height={550}
              src={banner.iamge}
              alt={banner.iamge}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselBanner;
