import React from 'react';
import { Image } from 'react-bootstrap';
import Slider from 'react-slick';
import '../css/components/CarouselSlider.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='main-carousel'>
      <div className='overlay-image'></div>
      <Slider {...settings}>
        <div className='carousel-content'>
          <div className='content-details'>
            <h1>JA Goldmart Enterprise</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
              nihil corrupti fuga voluptatibus
            </p>
          </div>
          <div className='content-image'>
            <Image src='img/product1.png' />
          </div>
        </div>

        <div className='carousel-content'>
          <div className='content-details'>
            <h1>JA Goldmart Enterprise</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
              nihil corrupti fuga voluptatibus
            </p>
          </div>
          <div className='content-image'>
            <Image src='img/products/air-compressor.png' />
          </div>
        </div>

        <div className='carousel-content'>
          <div className='content-details'>
            <h1>JA Goldmart Enterprise</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
              nihil corrupti fuga voluptatibus
            </p>
          </div>
          <div className='content-image'>
            <Image src='img/eccentric-slotter.png' />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
