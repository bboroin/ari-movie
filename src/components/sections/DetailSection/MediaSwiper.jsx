import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MediaSwiper = ({ items = [], renderItem, getKey = (_, i) => i }) => {
  if (!items?.length) return <p className="empty">표시할 항목이 없습니다.</p>;

  return (
    <div className="section-swiper">
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{ prevEl: ".section-prev", nextEl: ".section-next" }}
        a11y={{ enabled: true }}
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2, slidesPerGroup: 2 },
          480: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 5, slidesPerGroup: 5 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1280: { slidesPerView: 7, slidesPerGroup: 7 },
        }}
        rewind={true}
      >
        {items.map((item, i) => (
          <SwiperSlide key={getKey(item, i)}>{renderItem(item, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaSwiper;
