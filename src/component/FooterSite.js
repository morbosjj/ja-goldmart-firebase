import React from 'react';
import { Divider, Layout } from 'antd';
import { Link } from 'react-router-dom';
import '../css/components/Footer.css';

const { Footer } = Layout;

const FooterSite = () => {
  return (
    <Footer>
      <div className='footer'>
        <div className='footer-links'>
          <div className='link'>
            <h6>Products</h6>
            <ul>
              <li>
                <a href='/category/Die Cutting Machine'>Die Cutting Machine</a>
              </li>
              <li>
                <a href='/category/Paper Cutting Machine'>
                  Paper Cutting Machine
                </a>
              </li>
              <li>
                <a href='/category/Offset Printing Machine'>
                  Offset Printing Machine
                </a>
              </li>
              <li>
                <Link to='/shop'>View All Products</Link>
              </li>
            </ul>
          </div>

          <div className='link'>
            <h6>Resources</h6>
            <ul>
              <li>
                <Link to='/resources'>Brochures</Link>
              </li>
              <li>
                <Link to='/resources'>Videos</Link>
              </li>
            </ul>
          </div>

          <div className='link'>
            <h6>About</h6>
            <ul>
              <li>
                <Link to='/resources'>Company Profile</Link>
              </li>
              <li>
                <Link to='/resources'>Mission & Vission</Link>
              </li>
            </ul>
          </div>

          <div className='link'>
            <h6>Contact us</h6>
            <ul className='menu'>
              <li className='link-text'>
                <i className='far fa-envelope'></i> jagoldmart@gmail.com
              </li>
              <li className='link-text'>
                <i className='fas fa-phone'></i> 123456789
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-copyright'>
          <Divider />

          <p>
            Copyright &copy; 2020 JA Goldmart Enterprise All Rights Reserved.
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSite;
