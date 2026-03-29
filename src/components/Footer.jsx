import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="n-footer" id="contact">
        <div className="n-footer-grid">
          {/* BRAND + ACCRED + SOCIAL */}
          <div className="n-footer-brand n-footer-col">
            <img src="/images/Emb.jpg" alt="NBKRIST" className="n-f-logo" />
            <p className="n-f-name">NBKR Institute of Science &amp; Technology</p>
            <p className="n-f-desc">
              Vidyanagar, Nellore District, Andhra Pradesh — 524413<br />
              Affiliated to JNTUA &nbsp;·&nbsp; NAAC 'A' Grade &nbsp;·&nbsp; NBA Accredited &nbsp;·&nbsp; Autonomous
            </p>
            <div className="n-f-accred">
              <img src="/images/naac.jpg" alt="NAAC" title="NAAC A Grade" onError={(e) => e.target.style.display='none'} />
              <img src="/images/nba.jpg" alt="NBA" title="NBA" onError={(e) => e.target.style.display='none'} />
              <img src="/images/aicte.jpg" alt="AICTE" title="AICTE" onError={(e) => e.target.style.display='none'} />
              <img src="/images/ugc.jpg" alt="UGC" title="UGC" onError={(e) => e.target.style.display='none'} />
              <img src="/images/isoicon.png" alt="ISO" title="ISO" onError={(e) => e.target.style.display='none'} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="n-footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/admission3">Admissions 2026</Link></li>
              <li><Link to="/intake">Academic Programs</Link></li>
              <li><Link to="/pcell">Placement Cell</Link></li>
              <li><Link to="/library">Central Library</Link></li>
              <li><Link to="/Iqac">IQAC</Link></li>
              <li><Link to="/rtinew">RTI</Link></li>
              <li><Link to="/incubation_center">Innovation &amp; Incubation</Link></li>
              <li><Link to="/showallexamcell">Exam Notifications</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/Grivence">Grievance Redressal</Link></li>
              <li><a href="showallnews.php" target="_blank" rel="noopener noreferrer">eNews-Letter</a></li>
              <li><a href="https://drive.google.com/drive/folders/1GbasBEpaL1TrD-CsUXJTVpYf8Rzi-09A" target="_blank" rel="noopener noreferrer">NIRF</a></li>
            </ul>
          </div>

          {/* CAMPUS LIFE */}
          <div className="n-footer-col">
            <h5>Campus Life</h5>
            <ul>
              <li><Link to="/Campus_intro">Campus View</Link></li>
              <li><Link to="/Aerial_view">Aerial View</Link></li>
              <li><Link to="/sportsdepartment">Sports</Link></li>
              <li><Link to="/Codingclub">Coding Club</Link></li>
              <li><Link to="/yogaclub">Yoga Club</Link></li>
              <li><Link to="/Cultural">Cultural Club</Link></li>
              <li><Link to="/Literaryclub">Literary Club</Link></li>
              <li><Link to="/NCC">NCC – Army</Link></li>
              <li><Link to="/ncc_naval">NCC – Naval</Link></li>
              <li><Link to="/nss1">NSS</Link></li>
              <li><Link to="/trans">Transportation</Link></li>
              <li><Link to="/ladyhostel">Hostel &amp; Dining</Link></li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="n-footer-col">
            <h5>Contact Us</h5>
            <div className="n-f-contact">
              <a href="tel:8985382247">
                <i className="bi bi-telephone-fill"></i>
                +91 8985382247<br />+91 8985159547
              </a>
              <a href="mailto:ist@nbkrist.org">
                <i className="bi bi-envelope-fill"></i>
                ist@nbkrist.org
              </a>
              <a href="mailto:verify@nbkrist.org">
                <i className="bi bi-patch-check-fill"></i>
                verify@nbkrist.org
              </a>
              <Link to="/route">
                <i className="bi bi-geo-alt-fill"></i>
                Vidyanagar, Nellore Dist.,<br />Andhra Pradesh — 524413
              </Link>
            </div>
          </div>
        </div>{/* /.n-footer-grid */}

        {/* Group institutions strip */}
        <div className="n-footer-group">
          <span className="n-g-label">Group Institutions</span>
          <a href="http://www.nbkrsac.in/" target="_blank" rel="noopener noreferrer">Arts &amp; Science College</a>
          <span>B.Ed College</span>
          <span>Junior College</span>
          <span>Model High School</span>
        </div>

        {/* Copyright */}
        <div className="n-footer-copy">
          &copy; {new Date().getFullYear()} <strong>Technical Wing, NBKRIST.</strong>
          All rights reserved. &nbsp;·&nbsp;
          Feedback: <a href="mailto:website@nbkrist.org">website@nbkrist.org</a>
        </div>
      </footer>

      {/* Back to top */}
      <button 
        id="nBttBtn" 
        aria-label="Back to top"
        style={{ display: showScroll ? 'flex' : 'none' }}
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </>
  );
};

export default Footer;
