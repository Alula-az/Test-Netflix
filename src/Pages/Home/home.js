import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/banner";
import BannerSlide from "../../components/Banner/BannerSlide";
import RowList from "../../components/Rows/RowList/RowList";

const Home = () => {
  return (
    <>
      <Header />
      <BannerSlide />
      <RowList/>
      <Footer />
    </>
  );
};

export default Home;
