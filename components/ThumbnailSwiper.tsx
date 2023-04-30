import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper";

import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface MainSwiperProps {
  images: string[];
}
SwiperCore.use([Navigation, Thumbs]);

const ThumbnailSwiper: React.FC<MainSwiperProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="flex flex-col justify-center items-center">
      <Swiper
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        loop={true}
        spaceBetween={20}
        navigation={true}
        grabCursor={true} // su dung chuot de keo tha
        className="product-images-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Thumbnail ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        observer={true}
        observeParents={true}
        watchSlidesProgress={true}
        className="product-images-slider-thumbs"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Thumbnail ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbnailSwiper;
