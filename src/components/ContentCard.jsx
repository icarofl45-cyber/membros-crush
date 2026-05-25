import React from 'react';
import { Play, Download, FileText, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ContentCard.css';

const ContentCard = ({ item }) => {
  const isPdf = item.type === 'pdf';
  const isRoute = item.type === 'route';

  const CardContent = () => (
    <>
      <img src={item.thumb} alt={item.title} className="card-image" />
      <div className="card-overlay">
        <div className="card-actions">
          {isRoute ? (
            <div className="icon-btn" title="Abrir Dashboard">
              <BarChart2 size={20} />
            </div>
          ) : isPdf ? (
            <>
              <div className="icon-btn" title="Ver PDF">
                <FileText size={20} />
              </div>
              <div className="icon-btn" title="Descargar PDF">
                <Download size={20} />
              </div>
            </>
          ) : (
            <div className="icon-btn" title="Ver Video">
              <Play size={20} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const CardInfo = () => (
    <div className="card-info">
      <h3 className="card-title">{item.title}</h3>
      {isPdf && <span className="pdf-badge"><FileText size={12} style={{marginRight: '4px'}}/> PDF</span>}
    </div>
  );

  if (isRoute) {
    return (
      <div className="content-card-container">
        <Link to={item.url} className="content-card" style={{ textDecoration: 'none', display: 'block' }}>
          <CardContent />
        </Link>
        <CardInfo />
      </div>
    );
  }

  return (
    <div className="content-card-container">
      <a href={item.url} className="content-card" target={isPdf ? '_blank' : '_self'} rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <CardContent />
      </a>
      <CardInfo />
    </div>
  );
};

export default ContentCard;
