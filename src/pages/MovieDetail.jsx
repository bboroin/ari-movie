import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailHero from "../components/sections/DetailSection/DetailHero";
import { fetchMovieDetailFull } from "../api/movies";
import { getBestTrailerUrl } from "../api/videos";
import TrailerModal from "../components/sections/NowPlayingSection/TrailerModal";

const MovieDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState({ url: "", id: null });

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await fetchMovieDetailFull(id);
        if (!ignore) setDetail(data);
      } catch (err) {
        console.error("Failed to fetch movie detail:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleTrailerOpen = async () => {
    const url = await getBestTrailerUrl(id);
    setTrailer({ url, id });
  };

  const handleTrailerClose = () => setTrailer({ url: "", id: null });

  if (loading) return <div>로딩 중...</div>;
  if (!detail) return <div>영화 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <DetailHero detail={detail} onPlayTrailer={handleTrailerOpen} />

      {Boolean(trailer.url) && (
        <TrailerModal
          id={trailer.id}
          trailer={trailer.url}
          onClose={handleTrailerClose}
          display="center"
          detailBtn={false}
        />
      )}
    </div>
  );
};

export default MovieDetail;
