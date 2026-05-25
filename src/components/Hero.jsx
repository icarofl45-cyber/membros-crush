import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-background">
        <img 
          src="/logo grande.webp" 
          alt="Hero Background" 
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-actions">
          <button onClick={() => scrollTo('row-hombres')} className="hero-btn">
            Ver Clases Hombres
          </button>
          <button onClick={() => scrollTo('row-mujeres')} className="hero-btn">
            Ver Clases Mujeres
          </button>
          <button onClick={() => scrollTo('row-pdf')} className="hero-btn">
            Archivos PDF
          </button>
          <Link to="/bono-5" className="hero-btn highlight">
            Acceder al Gráfico
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
