import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import PageHero from '../components/PageHero';

const DepartmentPage = () => {
  const { deptSlug, subSlug } = useParams();
  const dept = departmentsData[deptSlug];
  const [faculty, setFaculty] = useState([]);
  const [loadingFaculty, setLoadingFaculty] = useState(false);
  const [facultyDeptName, setFacultyDeptName] = useState("");

  useEffect(() => {
    if (subSlug && subSlug.startsWith('faculty')) {
      // Handle faculty-ID or just faculty
      let targetId = dept?.facultyId;
      let nameStr = "Faculty Members";

      if (subSlug.includes('-')) {
        targetId = subSlug.split('-')[1];
        // Try to find the label from sidebarLinks
        const link = dept?.sidebarLinks.find(l => l.href.includes(subSlug));
        if (link) {
          nameStr = link.label.replace(/<[^>]*>?/gm, '').trim();
        }
      }

      setLoadingFaculty(true);
      fetch('/faculty.json')
        .then(res => res.json())
        .then(data => {
          if (data[targetId]) {
            setFaculty(data[targetId]);
            setFacultyDeptName(nameStr);
          } else {
            setFaculty([]);
          }
          setLoadingFaculty(false);
        })
        .catch(err => {
          console.error('Error loading faculty:', err);
          setLoadingFaculty(false);
        });
    }
  }, [subSlug, dept]);

  if (!dept) {
    return (
      <div className="n-inner-page">
        <div className="n-container text-center py-5">
          <h2>Department Not Found</h2>
          <Link to="/" className="n-btn">Return Home</Link>
        </div>
      </div>
    );
  }

  // Determine current section content
  let activeLabel = "Home";

  const renderMainContent = () => {
    if (subSlug && subSlug.startsWith('faculty')) {
      activeLabel = facultyDeptName || "Faculty";
      return (
        <>
          <div className="n-dept-section-head" style={{ marginBottom: '20px' }}>
            <i className="bi bi-person-badge"></i> {facultyDeptName || "Faculty Members"}
          </div>
          {loadingFaculty ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : faculty.length === 0 ? (
            <div className="alert alert-info">No faculty data available for this section.</div>
          ) : (
            <div className="n-faculty-grid">
              {faculty.map((f, i) => (
                <div className="n-faculty-card" key={i}>
                  <img src={f.image || "/images/user-temp.jpg"} alt={f.name} onError={e => e.target.src = "/images/user-temp.jpg"} />
                  <h3>{f.name}</h3>
                  <div className="n-designation">{f.designation}</div>
                  <div className="n-faculty-attr-list text-start">
                    {f.qualification && <div className="n-faculty-attr"><i className="bi bi-mortarboard-fill"></i> Qual: {f.qualification}</div>}
                    {f.email && <div className="n-faculty-attr" style={{ wordBreak: 'break-all' }}><i className="bi bi-envelope-fill"></i> {f.email}</div>}
                  </div>
                  {f.profile_link && <a href={f.profile_link} target="_blank" className="n-btn-profile mt-auto">View Profile</a>}
                </div>
              ))}
            </div>
          )}
        </>
      );
    }

    if (subSlug && dept.subPages[subSlug]) {
      // Find label for breadcrumb/active link
      const link = dept.sidebarLinks.find(l => l.href.includes(subSlug));
      if (link) activeLabel = link.label.replace(/<[^>]*>?/gm, '').trim();

      return (
        <div className="n-dept-content-block">
          <div dangerouslySetInnerHTML={{ __html: dept.subPages[subSlug] }} />
        </div>
      );
    }

    // Default Home section
    return (
      <>
        {/* Quote
        <div className="n-dept-quote">
          <i className="bi bi-quote"></i>
          "Quality is never an accident. It is always the result of intelligent effort."
        </div> */}

        {/* About */}
        <div className="n-dept-content-block">
          {/* <p className="n-label">About</p>
          <h2 className="n-heading" style={{ fontSize: '1.5rem' }}>Department Overview</h2> */}
          <div className="n-divider"></div>
          <div dangerouslySetInnerHTML={{ __html: dept.aboutHtml }} />
        </div>

        {/* Courses */}
        {dept.courses.length > 0 && (
          <div className="n-dept-content-block" style={{ marginTop: '28px' }}>
            <p className="n-label">Academics</p>
            <h2 className="n-heading" style={{ fontSize: '1.4rem' }}>Programs Offered</h2>
            <div className="n-divider"></div>
            <div className="table-responsive">
              <table className="n-dept-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Course</th>
                    <th>Branch</th>
                    <th>Intake</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.courses.map((c, i) => (
                    <tr key={i}>
                      <td>{c.sno}</td>
                      <td>{c.course}</td>
                      <td>{c.branch}</td>
                      <td dangerouslySetInnerHTML={{ __html: c.intake }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="n-dept-stats-row" style={{ marginTop: '28px' }}>
          {dept.stats.map((s, i) => (
            <div className="n-dept-stat" key={i}>
              <span className="n-dept-stat-num">{s.num}</span>
              <span className="n-dept-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const getIcon = () => {
    switch (dept.id) {
      case 'cse': return 'bi-cpu-fill';
      case 'ece': return 'bi-broadcast';
      case 'eee': return 'bi-lightning-charge';
      case 'mech': return 'bi-gear-wide-connected';
      case 'civ': return 'bi-bricks';
      case 'it': return 'bi-display';
      default: return 'bi-book';
    }
  };

  return (
    <>
      <style>{`
        .n-dept-sidebar { background: #fff; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .n-dept-sidebar-head { background: var(--primary); color: #fff; padding: 18px; font-weight: 600; font-size: 1.1rem; border-bottom: 2px solid var(--accent); }
        .n-dept-sidebar-links { list-style: none; padding: 0; margin: 0; }
        .n-dept-sidebar-links li { border-bottom: 1px solid #f5f5f5; transition: all 0.3s ease; }
        .n-dept-sidebar-links li:last-child { border-bottom: none; }
        .n-dept-sidebar-links a { display: block; padding: 12px 18px; color: #444; text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 10px; transition: all 0.2s; }
        .n-dept-sidebar-links a i { font-size: 1.1rem; color: var(--primary); }
        .n-dept-sidebar-links a:hover { background: #f9f9f9; color: var(--primary); padding-left: 22px; }
        .n-dept-sidebar-links a.active { background: #eef4ff; color: var(--primary); border-left: 4px solid var(--accent); padding-left: 18px; font-weight: 600; }
        .n-dept-sidebar-links a.active i { color: var(--accent); }

        .n-faculty-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
        .n-faculty-card { background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; transition: transform 0.3s; }
        .n-faculty-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .n-faculty-card img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid #f0f0f0; }
        .n-faculty-card h3 { font-size: 1.05rem; margin-bottom: 5px; color: var(--primary); font-weight: 700; height: 2.5rem; display: flex; align-items: center; justify-content: center; }
        .n-designation { font-size: 0.85rem; color: #666; font-weight: 500; margin-bottom: 12px; }
        .n-faculty-attr-list { font-size: 0.8rem; color: #777; width: 100%; }
        .n-faculty-attr { margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
        .n-btn-profile { background: #f0f4f8; color: var(--primary); padding: 8px 15px; border-radius: 20px; text-decoration: none; font-size: 0.8rem; font-weight: 600; margin-top: 15px; transition: 0.3s; }
        .n-btn-profile:hover { background: var(--accent); color: #fff; }

        /* ── Legacy sub-page HTML resets ─────────────────────────────────────── */
        /* Neutralise PHP/Bootstrap-3 boilerplate inside dangerouslySetInnerHTML */
        .n-dept-content-block #page-main,
        .n-dept-content-block #right-sidebar,
        .n-dept-content-block .container-fluid,
        .n-dept-content-block section { all: unset; display: block; }

        /* Hide empty Bootstrap 3 carousels that have no slides */
        .n-dept-content-block .carousel,
        .n-dept-content-block .carousel-inner,
        .n-dept-content-block .carousel-control,
        .n-dept-content-block .glyphicon { display: none !important; }

        /* Reset legacy <font> tags */
        .n-dept-content-block font { color: inherit !important; font-size: inherit !important; font-family: inherit !important; }

        /* Clean up hardcoded coloured headings */
        .n-dept-content-block h1,
        .n-dept-content-block h2,
        .n-dept-content-block h3,
        .n-dept-content-block h4 {
          font-size: 1.05rem; font-weight: 700;
          color: var(--primary) !important;
          background: none !important;
          padding: 6px 0 !important;
          margin: 14px 0 6px !important;
          border: none !important;
        }
        .n-dept-content-block h3 { font-size: 1.1rem; }

        /* Responsive, modern tables */
        .n-dept-content-block table {
          width: 100%; border-collapse: collapse;
          font-size: 0.88rem; margin: 12px 0;
        }
        .n-dept-content-block th,
        .n-dept-content-block td { padding: 8px 12px; border: 1px solid var(--border, #e8e8e8); vertical-align: top; }
        .n-dept-content-block thead th,
        .n-dept-content-block th { background: var(--primary); color: #fff !important; font-weight: 600; }
        .n-dept-content-block tr:nth-child(even) td { background: #f7f9fc; }
        .n-dept-content-block td[background],
        .n-dept-content-block th[background] { background-image: none !important; }

        /* Links */
        .n-dept-content-block a { color: var(--accent); text-decoration: none; }
        .n-dept-content-block a:hover { text-decoration: underline; }

        /* Body text */
        .n-dept-content-block p,
        .n-dept-content-block .text1,
        .n-dept-content-block .ContentM,
        .n-dept-content-block .ContentMNoIndent {
          line-height: 1.75; color: var(--text-muted, #555);
          margin-bottom: 10px; all: unset; display: block;
          color: var(--text-muted, #555); line-height: 1.75; margin-bottom: 10px;
        }
        .n-dept-content-block center { display: block; text-align: left; }
        .n-dept-content-block b, .n-dept-content-block strong { color: var(--primary); }
        .n-dept-content-block hr { border: none; border-top: 1px solid #eee; margin: 10px 0; }
        .n-dept-content-block ul, .n-dept-content-block ol { padding-left: 20px; margin-bottom: 10px; }
        .n-dept-content-block li { margin-bottom: 4px; line-height: 1.65; color: var(--text-muted, #555); }
        /* ──────────────────────────────────────────────────────────────────────── */
      `}</style>

      <PageHero
        title={dept.heroTitle}
        breadcrumb={activeLabel === "Home" ? (dept.id.toUpperCase() + " Department") : activeLabel}
      />

      <div className="n-inner-page py-5">
        <div className="n-container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4">
              <nav className="n-dept-sidebar" style={{ top: '100px' }}>
                <div className="n-dept-sidebar-head">
                  <i className={`bi ${getIcon()}`}></i> {dept.id === 'sh' ? 'S & H' : dept.id.toUpperCase()} Dept
                </div>
                <ul className="n-dept-sidebar-links">
                  <li>
                    <Link to={`/department/${dept.id}`} className={!subSlug ? 'active' : ''}>
                      <i className="bi bi-house-door"></i> {dept.id === 'sh' ? 'Home' : 'About Department'}
                    </Link>
                  </li>

                  {dept.sidebarLinks
                    .filter(link => {
                      const lbl = link.label.toLowerCase();
                      const homePath = `/department/${dept.id}`;
                      // Skip if redundant with our manual Home/About link or pointing back to same place
                      if (lbl.includes('home') || lbl.includes('about department')) return false;
                      if (link.href === homePath || link.href === homePath + '/') return false;

                      // For non-SH, skip "Faculty" links in data since we add one manually down below
                      if (dept.id !== 'sh' && lbl.includes('faculty')) return false;
                      return true;
                    })
                    .map((link, idx) => {
                      const isActive = subSlug && link.href.includes(subSlug);
                      const isExternalOrFile = link.href.startsWith('http') || link.href.endsWith('.pdf');

                      return (
                        <li key={idx}>
                          {isExternalOrFile ? (
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                              <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </a>
                          ) : (
                            <Link to={link.href} className={isActive ? 'active' : ''}>
                              <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                          )}
                        </li>
                      );
                    })}

                  {/* Manual Faculty Link for standard departments */}
                  {dept.id !== 'sh' && (
                    <li>
                      <Link
                        to={`/department/${dept.id}/faculty`}
                        className={subSlug === 'faculty' ? 'active' : ''}
                      >
                        <i className="bi bi-person-lines-fill"></i> Faculty
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              {renderMainContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;
