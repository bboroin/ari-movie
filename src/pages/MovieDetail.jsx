import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getBestTrailerUrl } from "../api/videos";
import { useMovieDetailFull } from "../hooks/useMovieDetailFull";
import { sortCrew } from "../utils/sort";
import DetailHero from "../components/sections/DetailSection/DetailHero";
import TrailerModal from "../components/sections/NowPlayingSection/TrailerModal";
import DetailPeople from "../components/sections/DetailSection/DetailPeople";

const MovieDetail = () => {
  const { id } = useParams();
  const { detail, loading } = useMovieDetailFull(id);
  const [isOpen, setIsOpen] = useState(false);
  const [trailer, setTrailer] = useState({ url: "", id: null });

  const handleTrailerOpen = async () => {
    const url = await getBestTrailerUrl(id);
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
      <DetailHero detail={detail} onPlayTrailer={handleTrailerOpen} />

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
    </div>
  );
};

export default MovieDetail;
