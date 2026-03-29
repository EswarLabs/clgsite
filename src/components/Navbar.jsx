import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownClick = (e) => {
    if (window.innerWidth > 900) return;
    const parentLi = e.currentTarget.parentElement;
    parentLi.classList.toggle('open');
    e.preventDefault();
  };

  return (
    <>
      {/* ── TIER 1: UTILITY BAR ── */}
      <div className="n-utility-bar" role="banner">
        <div className="n-ub-inner">
          <div className="n-ub-left">
            <span><i className="bi bi-telephone-fill"></i>&nbsp;8985382247</span>
            <span className="d-none d-md-inline" aria-hidden="true">|</span>
            <a href="mailto:ist@nbkrist.org"><i className="bi bi-envelope-fill"></i>&nbsp;ist@nbkrist.org</a>
          </div>

          <div className="n-ub-right">
            <Link to="/showallexamcell"><i className="bi bi-file-earmark-text"></i> Exam Cell</Link>
            <a href="showallnews.php" target="_blank" rel="noopener noreferrer"><i className="bi bi-newspaper"></i> E-Newsletter</a>
            <a href="http://portal.nbkrsac.in/" target="_blank" rel="noopener noreferrer"><i className="bi bi-person-fill"></i> Student Login</a>
            <Link to="/contactus"><i className="bi bi-geo-alt-fill"></i> Contact</Link>
          </div>
        </div>
      </div>

      {/* ── TIER 2: MAIN NAV ── */}
      <nav className={`n-main-nav ${isScrolled ? 'scrolled' : ''}`} id="nMainNav" aria-label="Main navigation">
        <div className="n-nav-inner">
          {/* Logo */}
          <Link to="/" className="n-nav-logo" aria-label="NBKRIST Home">
            <img src="/images/Emb.jpg" alt="NBKRIST Emblem" width="44" height="44" />
            <div className="n-logo-text">
              <span className="n-logo-name">NBKRIST</span>
              <span className="n-logo-tag">Vidyanagar · Est. 1979</span>
            </div>
          </Link>

          {/* Hamburger (mobile) */}
          <button 
            className="n-hamburger" 
            id="nHamburger" 
            aria-label="Toggle menu" 
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>

          {/* Nav links */}
          <ul className={`n-nav-links ${isMenuOpen ? 'open' : ''}`} id="nNavLinks" role="menubar">
            <li role="none"><Link to="/" role="menuitem">Home</Link></li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" tabIndex="0" onClick={handleDropdownClick}>
                About <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/aboutus" role="menuitem">About Institute</Link>
                <Link to="/vm1" role="menuitem">Vision &amp; Mission</Link>
                <Link to="/gm1" role="menuitem">Governing Body</Link>
                <Link to="/orgchart1" role="menuitem">Organizational Structure</Link>
                <Link to="/rtinew" role="menuitem">Right to Information</Link>
              </div>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                Admissions <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/admission3" role="menuitem">Courses Offered</Link>
              </div>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                Administration <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/director" role="menuitem">Director</Link>
                <Link to="/administrativeofficer" role="menuitem">Administrative Officer</Link>
                <Link to="/controlerofexam" role="menuitem">Controller of Examinations</Link>
                <Link to="/admin" role="menuitem">Admin Dashboard</Link>
              </div>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                Academics <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/intake" role="menuitem">Academic Programs</Link>
                <Link to="/academiccal" role="menuitem">Academic Calendar</Link>
                <Link to="/NEP2020" role="menuitem">NEP 2020 Initiatives</Link>
                <Link to="/syllabus1" role="menuitem">Syllabus</Link>
                <Link to="/OBE" role="menuitem">Outcome Based Education</Link>
                <Link to="/rules_reg" role="menuitem">Academic Regulations</Link>
                <Link to="/library" role="menuitem">Central Library</Link>
              </div>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                Departments <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/department/civ" role="menuitem">Civil Engineering</Link>
                <Link to="/department/cse" role="menuitem">CSE | AI&amp;ML | DS</Link>
                <Link to="/department/it" role="menuitem">IT | AI&amp;DS</Link>
                <Link to="/department/ece" role="menuitem">Electronics &amp; Comm.</Link>
                <Link to="/department/eee" role="menuitem">Electrical &amp; Electronics</Link>
                <Link to="/department/mech" role="menuitem">Mechanical Engineering</Link>
                <Link to="/department/sh" role="menuitem">Sciences &amp; Humanities</Link>
              </div>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                Placement <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/pcell" role="menuitem">Placement Cell</Link>
                <Link to="/showallplcement" role="menuitem">Latest Drives</Link>
                <Link to="/precord" role="menuitem">Placement Record</Link>
                <Link to="/PlacementcontactUs" role="menuitem">Contact Us</Link>
              </div>
            </li>

            <li role="none">
              <Link to="/sportsdepartment" role="menuitem">Sports</Link>
            </li>

            <li role="none">
              <a href="#" role="menuitem" aria-haspopup="true" tabIndex="0" onClick={handleDropdownClick}>
                More <span className="n-caret">▾</span>
              </a>
              <div className="n-nav-drop" role="menu">
                <Link to="/showallexamcell" role="menuitem">Exam Notifications</Link>
                <Link to="/showallexamcell1" role="menuitem">Annual Reports</Link>
                <Link to="/Iqac" role="menuitem">IQAC</Link>
                <Link to="/incubation_center" role="menuitem">Innovation &amp; Incubation</Link>
                <a href="showallnews.php" target="_blank" rel="noopener noreferrer" role="menuitem">E-News Letter</a>
              </div>
            </li>

          </ul>{/* /.n-nav-links */}

          {/* CTA */}
          <div className="n-nav-cta">
            <Link to="/admission3" className="n-btn-apply">Apply Now</Link>
          </div>

        </div>{/* /.n-nav-inner */}
      </nav>
    </>
  );
};

export default Navbar;
