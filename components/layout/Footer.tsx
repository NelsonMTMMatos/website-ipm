'use client';

import React from 'react'
import { useMediaQuery } from 'react-responsive';
import MobileFooter from './Footer/MobileFooter';
import DesktopFooter from './Footer/DesktopFooter';

const Footer = () => {

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    isMobile ? <MobileFooter /> : <DesktopFooter />
  )
}

export default Footer