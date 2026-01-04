import React from "react";
import Banner from "../components/home/Banner";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ExtraSection1 from "../components/home/ExtraSection1";
import ExtraSection2 from "../components/home/ExtraSection2";
import Footer from "../components/Footer";
import FAQ from "../components/home/FAQ";
import Blogs from "../components/home/Blogs";
import Statistics from "../components/home/Statistics";
import Services from "../components/home/Services";
import Support from "../components/home/Support";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProperties />
      <WhyChooseUs />
      <ExtraSection1 />
      <Services></Services>
      <Blogs preview={true}/>
      <Statistics></Statistics>
      <Support></Support>
      <FAQ></FAQ>
      <ExtraSection2 />
    </div>
  );
}
