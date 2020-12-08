import React from 'react';
import { Layout } from 'antd';
import Navigation from '../Navigation/Navigation';
import CarouselSlider from '../CarouselSlider';
import Featured from '../Featured';
import About from '../About';
import FooterSite from '../FooterSite';

const Home = () => {
  return (
    <Layout>
      <Navigation />
      <CarouselSlider />
      <Featured />
      <About />
      <FooterSite />
    </Layout>
  );
};

export default Home;
