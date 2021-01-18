import React, { useEffect } from 'react';
import AOS from 'aos';
import { Layout } from 'antd';
import Navigation from '../Navigation/Navigation';
import CarouselSlider from '../CarouselSlider';
import Featured from '../Featured';
import About from '../About';
import FooterSite from '../FooterSite';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
