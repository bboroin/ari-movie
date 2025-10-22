import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detail 페이지</h1>
      <p>id: {id}</p>
    </div>
  );
};

export default MovieDetail;
