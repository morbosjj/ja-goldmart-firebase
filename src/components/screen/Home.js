import React from 'react';
import { Layout } from 'antd';
import Navigation from '../Navigation/Navigation';
import CarouselSlider from '../CarouselSlider';
import Featured from '../Featured';
import About from '../About';
import FooterSite from '../FooterSite';
import AlgoliaSearch from '../AlgoliaSearch';

const Home = () => {
  return (
    <Layout>
      <Navigation />
      {/* <AlgoliaSearch /> */}
      <CarouselSlider />
      <Featured />
      <About />
      <FooterSite />
    </Layout>
  );
};

export default Home;
