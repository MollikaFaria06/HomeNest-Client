import React from "react";
import Banner from "../components/home/Banner";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ExtraSection1 from "../components/home/ExtraSection1";
import ExtraSection2 from "../components/home/ExtraSection2";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProperties />
      <WhyChooseUs />
      <ExtraSection1 />
      <ExtraSection2 />
    </div>
  );
}
