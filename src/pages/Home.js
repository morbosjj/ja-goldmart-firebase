import React, { useEffect } from 'react';
import AOS from 'aos';
import { Layout } from 'antd';
import Meta from '../component/Meta';
import Navigation from '../component/Navigation';
import Carousel from '../component/Carousel';
import Featured from '../component/Featured';
import AboutUs from '../component/AboutUs';
import FooterSite from '../component/FooterSite';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta />
      <Layout className='main'>
        <Navigation />
        <Carousel />
        <Featured />
        <AboutUs />
        <FooterSite />
      </Layout>
    </>
  );
};

export default Home;
