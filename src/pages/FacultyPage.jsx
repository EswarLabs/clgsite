import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { departmentsData } from '../data/departmentsData';

const FacultyPage = () => {
  const { deptSlug } = useParams();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const dept = departmentsData[deptSlug];

  useEffect(() => {
    fetch('/faculty.json')
      .then(res => res.json())
      .then(data => {
        if (dept && data[dept.facultyId]) {
          setFaculty(data[dept.facultyId]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading faculty:', err);
        setLoading(false);
      });
  }, [dept]);

  if (!dept) return <div className="py-5 text-center">Department not found</div>;

  return (
    <>
      <style>{`
        .n-faculty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .n-faculty-card {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .n-faculty-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }
        .n-faculty-card img {
            width: 130px;
            height: 130px;
            object-fit: cover;
            border-radius: 50%;
            margin: 0 auto 15px auto;
            border: 4px solid var(--accent);
            background: #f8f9fa;
        }
        .n-faculty-card h3 {
            font-size: 1.15rem;
            color: var(--primary);
            margin-bottom: 5px;
            font-weight: 700;
        }
        .n-faculty-card .n-designation {
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 20px;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .n-faculty-attr-list {
            text-align: left;
            margin-bottom: 20px;
        }
        .n-faculty-attr {
            font-size: 0.85rem;
            margin-bottom: 6px;
            color: #555;
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }
        .n-faculty-attr i {
            color: var(--primary);
            width: 16px;
        }
        .n-faculty-attr strong {
            color: #333;
            min-width: 45px;
        }
        .n-faculty-card .n-btn-profile {
            padding: 8px 16px;
            background: var(--primary);
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s;
        }
        .n-faculty-card .n-btn-profile:hover {
            background: var(--accent);
            color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
      `}</style>
      
      <PageHero title={dept.heroTitle} breadcrumb={`${dept.id.toUpperCase()} Faculty`} />

      <div className="n-inner-page">
        <div className="n-container">
          <div className="n-dept-section-head" style={{ marginBottom: '20px' }}>
            <i className="bi bi-person-badge"></i> Faculty Members
          </div>

          {loading ? (
             <div className="text-center py-5">
               <div className="spinner-border text-primary" role="status"></div>
             </div>
          ) : faculty.length === 0 ? (
            <div className="alert alert-info">No faculty members found.</div>
          ) : (
            <div className="n-faculty-grid">
              {faculty.map((f, i) => (
                <div className="n-faculty-card" key={i}>
                  <div>
                    <img 
                      src={f.image && f.image.trim() !== "" ? f.image : "/images/default_faculty.png"} 
                      alt={f.name} 
                      onError={(e) => { e.target.src = "/images/user-temp.jpg"; }} 
                    />
                    <h3>{f.name}</h3>
                    <div className="n-designation">{f.designation}</div>
                    
                    <div className="n-faculty-attr-list">
                      {f.qualification && (
                        <div className="n-faculty-attr">
                          <i className="bi bi-mortarboard-fill"></i> 
                          <strong>Qual:</strong> {f.qualification}
                        </div>
                      )}
                      {f.doj && (
                        <div className="n-faculty-attr">
                          <i className="bi bi-calendar-check-fill"></i> 
                          <strong>DOJ:</strong> {f.doj}
                        </div>
                      )}
                      {f.phone && (
                        <div className="n-faculty-attr">
                          <i className="bi bi-telephone-fill"></i> 
                          <strong>Phone:</strong> {f.phone}
                        </div>
                      )}
                      {f.email && (
                        <div className="n-faculty-attr" style={{ wordBreak: 'break-all' }}>
                          <i className="bi bi-envelope-fill"></i> 
                          <strong>Email:</strong> {f.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {f.profile_link && (
                    <a href={f.profile_link} className="n-btn-profile" target="_blank" rel="noopener noreferrer">
                      View Detailed Profile
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FacultyPage;
