import React, { useEffect } from 'react';
import AOS from 'aos';
import { Layout } from 'antd';
import Navigation from '../Navigation/Navigation';
import Carousel from '../Carousel';
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
    <Layout className='main'>
      <Navigation />
      <Carousel />
      <Featured />
      <About />
      <FooterSite />
    </Layout>
  );
};

export default Home;
