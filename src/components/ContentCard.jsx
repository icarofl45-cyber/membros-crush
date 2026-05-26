import React from 'react';
import { Play, Download, FileText, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ContentCard.css';

const ContentCard = ({ item }) => {
  const isPdf = item.type === 'pdf';
  const isRoute = item.type === 'route';

  const CardContent = () => (
    <div className="content-card" tabIndex="0">
      <img src={item.thumb} alt={item.title} className="card-image" loading="lazy" />
      <div className="card-overlay">
        <div className="card-actions">
          {isRoute ? (
            <Link to={item.url} className="icon-btn" title="Abrir Dashboard" style={{ textDecoration: 'none', color: 'white' }}>
              <BarChart2 size={20} />
            </Link>
          ) : isPdf ? (
            <>
              <a href={item.url} target="_blank" rel="noreferrer" className="icon-btn" title="Ver PDF" style={{ textDecoration: 'none', color: 'white' }}>
                <FileText size={20} />
              </a>
              <a href={item.url} download target="_blank" rel="noreferrer" className="icon-btn" title="Descargar PDF" style={{ textDecoration: 'none', color: 'white' }}>
                <Download size={20} />
              </a>
            </>
          ) : (
            <a href={item.url} target="_blank" rel="noreferrer" className="icon-btn" title="Ver Video" style={{ textDecoration: 'none', color: 'white' }}>
              <Play size={20} fill="currentColor" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const CardInfo = () => (
    <div className="card-info">
      <h3 className="card-title">{item.title}</h3>
      {isPdf && <span className="pdf-badge"><FileText size={12} style={{marginRight: '4px'}}/> PDF</span>}
    </div>
  );

  return (
    <div className="content-card-container">
      <CardContent />
      <CardInfo />
    </div>
  );
};

export default ContentCard;
