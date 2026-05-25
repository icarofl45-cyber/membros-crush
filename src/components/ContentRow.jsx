import React from 'react';
import ContentCard from './ContentCard';
import './ContentRow.css';

const ContentRow = ({ title, items }) => {
  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-slider">
        <div className="row-container">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
