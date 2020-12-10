import React from 'react';
import Logo from '../../img/logo.png';
import Illustration from '../../img/maintenance.svg';
import '../../css/components/Maintenance.css';
const Maintenance = () => {
  return (
    <div className='page-maintenance'>
      <div className='maintenance-header'>
        <div className='logo-wrapper'>
          <img src={Logo} alt='company' className='maintenance-image' />
        </div>
        <h2>JA Goldmart Enterprise</h2>
      </div>

      <div className='maintenance-title'>
        <h1>The site is currently down for maintenance</h1>
        <p>We apologize for any inconveniences caused and will be back soon.</p>
        <img src={Illustration} alt='maintenance' />
      </div>

      <div className='maintenance-footer'>
        <ul>
          <li>
            <p>You can contact us</p>
          </li>
          <li>Phone: 0912345789</li>
          <li>Email: site@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Maintenance;
