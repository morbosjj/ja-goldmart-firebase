import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/About.css';

const About = () => {
  return (
    <div className='about-us'>
      <div className='about-img'>
        <img src='img/about.jpg' alt='company' />
      </div>

      <div className='about'>
        {/* className='about-title' */}
        <h1> About </h1>

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
