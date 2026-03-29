import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, breadcrumb }) => {
  return (
    <div className="n-page-hero">
      <h1>{title}</h1>
      <p className="n-hero-breadcrumb">
        <Link to="/">Home</Link> &rsaquo; {breadcrumb}
      </p>
    </div>
  );
};

export default PageHero;
