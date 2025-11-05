import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const MediaSwiper = ({ items = [], renderItem, getKey = (_, i) => i }) => {
  if (!items?.length) return <p className="empty">표시할 항목이 없습니다.</p>;

  return (
    <div className="media-swiper section-swiper">
      <Swiper
        modules={[Navigation, A11y, Scrollbar]}
        scrollbar={{ enabled: true, draggable: true, hide: false }}
        a11y={{ enabled: true }}
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={20}
        breakpoints={{
          0: {
            navigation: false,
            slidesPerView: 2,
          },
          480: { slidesPerView: 3 },
          768: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            navigation: {
              prevEl: '.section-prev[data-nav="media"]',
              nextEl: '.section-next[data-nav="media"]',
            },
            scrollbar: false,
          },
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
