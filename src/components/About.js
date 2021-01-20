import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/About.css';

const About = () => {
  return (
    <div className='about-us' data-aos='fade-up' data-aos-once='true'>
      <div
        className='about-img'
        data-aos='fade-up'
        data-aos-once='true'
        data-aos-delay='1000'
      >
        <img src='img/about.jpg' alt='company' />
      </div>

      <div
        className='about'
        data-aos='fade-up'
        data-aos-once='true'
        data-aos-delay='1500'
      >
        <h1> JA Goldmart Enterprise </h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          nihil corrupti fuga voluptatibus beatae voluptas aspernatur ad sed
          labore itaque molestias vitae tempora obcaecati placeat necessitatibus
          quisquam nesciunt optio impedit, illo similique soluta nostrum sint
          nisi alias. Consectetur doloremque voluptatum corporis hic?
        </p>

        <Link to='/about'>
          <i className='fab fa-readme'></i> Read more
        </Link>
      </div>
    </div>
  );
};

export default About;
