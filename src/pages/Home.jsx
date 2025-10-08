import React from "react";
import TrendingSection from "../components/sections/TrailerSection/TrendingSection";
import UpcomingSection from "../components/sections/TrendingSection/UpcomingSection";
import TrailerSection from "../components/sections/UpcomingSection/TrailerSection";

const Home = () => {
  return (
    <div>
      <TrendingSection />
      <UpcomingSection />
      <TrailerSection />
    </div>
  );
};

export default Home;
