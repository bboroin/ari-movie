import React from "react";
import HeroSection from "../components/sections/HeroSection/HeroSection";
import TrendingSection from "../components/sections/TrendingSection/TrendingSection";
import NowPlayingSection from "../components/sections/NowPlayingSection/NowPlayingSection";
import UpcomingSection from "../components/sections/UpcomingSection/UpcomingSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendingSection />
      <NowPlayingSection />
      <UpcomingSection />
    </div>
  );
};

export default Home;
