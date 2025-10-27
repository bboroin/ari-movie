import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PersonCard from "./PersonCard";

function PeopleSwiper({ people = [], type }) {
  if (!people?.length) return <p className="empty">표시할 인물이 없어요.</p>;

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
          320: { slidesPerView: 4, slidesPerGroup: 4 },
          640: { slidesPerView: 5, slidesPerGroup: 5 },
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
