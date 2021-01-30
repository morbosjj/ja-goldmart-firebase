import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../css/components/Loader.css';

const Loader = () => {
  // return <div className='loader-container'></div>;
  return (
    <div className='loader-container'>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
