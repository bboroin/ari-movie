import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import PersonCard from "./PersonCard";

function PeopleSwiper({ people = [], type }) {
  if (!people?.length) return <p className="empty">표시할 인물이 없습니다.</p>;

  return (
    <div className="people-swiper section-swiper">
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
              prevEl: '.section-prev[data-nav="people"]',
              nextEl: '.section-next[data-nav="people"]',
            },
            scrollbar: false,
          },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1280: { slidesPerView: 7, slidesPerGroup: 7 },
        }}
        rewind={true}
      >
        {people.map((p) => (
          <SwiperSlide>
            <PersonCard
              key={`${type}-${p.id}`}
              name={p.name}
              sub={type === "cast" ? p.character : p.job || p.department}
              imgPath={p.profile_path}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PeopleSwiper;
