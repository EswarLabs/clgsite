import React from 'react';

const Header = () => {
  return (
    <div className="n-social-sidebar" aria-label="Social media links">
      <a href="https://www.facebook.com/nbkrist.nbkrist" className="ss-fb" target="_blank" rel="noopener noreferrer" title="Facebook">
        <i className="bi bi-facebook"></i>
      </a>
      <a href="https://www.instagram.com/nbkrist_official/" className="ss-ig" target="_blank" rel="noopener noreferrer" title="Instagram">
        <i className="bi bi-instagram"></i>
      </a>
      <a href="https://www.linkedin.com/in/nbkrist" className="ss-li" target="_blank" rel="noopener noreferrer" title="LinkedIn">
        <i className="bi bi-linkedin"></i>
      </a>
      <a href="https://www.youtube.com/@NBKRIST1979" className="ss-yt" target="_blank" rel="noopener noreferrer" title="YouTube">
        <i className="bi bi-youtube"></i>
      </a>
      <a href="https://twitter.com/NBKRIST2" className="ss-tw" target="_blank" rel="noopener noreferrer" title="X/Twitter">
        <i className="bi bi-twitter-x"></i>
      </a>
    </div>
  );
};

export default Header;
