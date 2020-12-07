import React from 'react';
import Navigation from '../Navigation/Navigation';
import FooterSite from '../FooterSite';

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
