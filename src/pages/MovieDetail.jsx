import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getBestTrailerUrl } from "@api/videos";
import { useMovieDetailFull } from "@hooks/useMovieDetailFull";
import { sortCrew } from "@utils/sort";
import DetailHero from "@components/sections/DetailSection/DetailHero/DetailHero";
import TrailerModal from "@components/sections/common/TrailerModal";
import DetailPeople from "@components/sections/DetailSection/DetailPeople/DetailPeople";
import DetailMedia from "@components/sections/DetailSection/DetailMedia/DetailMedia";
import DetailInfo from "@components/sections/DetailSection/DetailInfo/DetailInfo";
import Recommendation from "@/components/sections/DetailSection/DetailRelated/DetailRecommended";
import DetailCollection from "@/components/sections/DetailSection/DetailRelated/DetailCollection";
import SideNav from "@/components/sections/common/SideNav";

const MovieDetail = () => {
  const { id } = useParams();
  const { detail, loading } = useMovieDetailFull(id);
  const [isOpen, setIsOpen] = useState(false);
  const [trailer, setTrailer] = useState({ url: "", id: null });

  const handlePlay = async (videoKey) => {
    const url = videoKey
      ? `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`
      : await getBestTrailerUrl(id);
    setIsOpen(true);
    setTrailer({ url, id });
  };

  const handleTrailerClose = () => {
    setTrailer({ url: "", id: null });
    setIsOpen(false);
  };

  const sortedCrew = sortCrew(detail?.credits?.crew ?? []);

  if (loading) return <div>로딩 중...</div>;
  if (!detail) return <div>영화 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <DetailHero detail={detail} onPlayTrailer={() => handlePlay()} />

      {isOpen && (
        <TrailerModal
          id={trailer.id}
          trailer={trailer.url}
          onClose={handleTrailerClose}
          display="center"
          detailBtn={false}
        />
      )}

      <DetailPeople
        anchorId="people"
        cast={detail?.credits?.cast ?? []}
        crew={sortedCrew ?? []}
      />

      <DetailMedia
        anchorId="media"
        videos={detail?.videos?.results ?? []}
        backdrops={detail?.images?.backdrops ?? []}
        posters={detail?.images?.posters ?? []}
        onPlay={handlePlay}
      />

      <DetailInfo anchorId="info" detail={detail} />

      <DetailCollection anchorId="collection" movieId={id} />
      <Recommendation anchorId="recommended" movieId={id} />

      <SideNav
        items={[
          { label: "People", selector: "people" },
          { label: "Media", selector: "media" },
          { label: "Info", selector: "info" },
          { label: "Collection", selector: "collection" },
          { label: "Recommended", selector: "recommended" },
        ]}
      />
    </div>
  );
};

export default MovieDetail;
