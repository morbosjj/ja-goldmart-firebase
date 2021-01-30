import React from 'react';
import Navigation from '../component/Navigation';
import FooterSite from '../component/FooterSite';

const MainContainer = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <FooterSite />
    </>
  );
};

export default MainContainer;
