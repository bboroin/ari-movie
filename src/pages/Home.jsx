import React from "react";
import HeroSection from "@components/sections/HeroSection/HeroSection";
import TrendingSection from "@components/sections/TrendingSection/TrendingSection";
import NowPlayingSection from "@components/sections/NowPlayingSection/NowPlayingSection";
import UpcomingSection from "@components/sections/UpcomingSection/UpcomingSection";
import SideNav from "@/components/sections/common/SideNav";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendingSection id="trending" />
      <NowPlayingSection id="now-playing" />
      <UpcomingSection id="upcoming" />

      <SideNav
        items={[
          { label: "Trending", short: "Trend", selector: "trending" },
          { label: "Now Playing", short: "Now", selector: "now-playing" },
          { label: "Upcoming", short: "Soon", selector: "upcoming" },
        ]}
      />
    </div>
  );
};

export default Home;
