import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className='hero'>
      <img src="https://images.wsj.net/im-65599456?size=1.5" alt="restaurant" />
      <div className="item">
        <h3>Dream Maker</h3>
        <div>
          <h1>Turning Dreams into Reality</h1>
          <p>We believe that it is all about the BIG DREAMS and the small details!</p>
          <Link to="/login">BOOK NOW</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
