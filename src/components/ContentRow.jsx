import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import './ContentRow.css';

const ContentRow = ({ title, items }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 50 : scrollLeft + clientWidth - 50;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      
      <div className="slider-wrapper">
        <button className="slider-arrow left" onClick={() => scroll('left')}>
          <ChevronLeft size={32} />
        </button>

        <div className="row-slider" ref={sliderRef}>
          <div className="row-container">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <button className="slider-arrow right" onClick={() => scroll('right')}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default ContentRow;
