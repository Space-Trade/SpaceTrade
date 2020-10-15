import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {
  return (
    <>
      <Hero className="illustration-section-01" />
      <div className="container">
        <Testimonial topDivider />
        <Cta split />
      </div>
    </>
  );
}

export default Home;