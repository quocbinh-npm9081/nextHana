import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore, { Navigation, Thumbs, FreeMode } from "swiper";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Pagination, Navigation } from "swiper";

interface MainSwiperProps {
  images: string[];
}
// SwiperCore.use([Navigation, Thumbs, FreeMode]);

const ThumbnailSwiper: React.FC<MainSwiperProps> = ({ images }) => {
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <Swiper
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        grabCursor={true} // su dung chuot de keo tha
        className="productImagesSlider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={600}
              height={200}
              src={image}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        observer={true}
        observeParents={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productImagesSliderThumbs"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={200}
              height={100}
              src={image}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Swiper
        loop={true}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={600}
              height={200}
              src={image}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbnailSwiper;
