import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getBestTrailerUrl } from "../api/videos";
import { useMovieDetailFull } from "../hooks/useMovieDetailFull";
import { sortCrew } from "../utils/sort";
import DetailHero from "../components/sections/DetailSection/DetailHero/DetailHero";
import TrailerModal from "../components/sections/NowPlayingSection/TrailerModal";
import DetailPeople from "../components/sections/DetailSection/DetailPeople/DetailPeople";
import DetailMedia from "../components/sections/DetailSection/DetailMedia/DetailMedia";
import DetailInfo from "../components/sections/DetailSection/DetailInfo/DetailInfo";

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
        cast={detail?.credits?.cast ?? []}
        crew={sortedCrew ?? []}
      />

      <DetailMedia
        videos={detail?.videos?.results ?? []}
        backdrops={detail?.images?.backdrops ?? []}
        posters={detail?.images?.posters ?? []}
        onPlay={handlePlay}
      />

      <DetailInfo detail={detail} />
    </div>
  );
};

export default MovieDetail;
