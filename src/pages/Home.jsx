import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Ported JS logic for carousel
    const track = document.getElementById('achieveTrack');
    const dots = document.querySelectorAll('#achieveDots .n-achieve-dot');
    const prevBtn = document.getElementById('achievePrev');
    const nextBtn = document.getElementById('achieveNext');
    const progFill = document.getElementById('achieveProgress');
    const carousel = document.getElementById('achieveCarousel');
    if (!track) return;

    const total = track.children.length;
    let cur = 0;
    const DURATION = 4000;
    let rafId, startTime, paused = false;

    function goTo(idx) {
        cur = (idx + total) % total;
        track.style.transform = 'translateX(-' + (cur * 100) + '%)';
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === cur);
        });
    }

    function resetProgress() {
        startTime = null;
        if (progFill) progFill.style.width = '0%';
    }

    function tickProgress(ts) {
        if (paused) return;
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const pct = Math.min(elapsed / DURATION * 100, 100);
        if (progFill) progFill.style.width = pct + '%';
        if (elapsed >= DURATION) {
            goTo(cur + 1);
            resetProgress();
        }
        rafId = requestAnimationFrame(tickProgress);
    }

    function startLoop() {
        paused = false;
        resetProgress();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tickProgress);
    }

    function pauseLoop() {
        paused = true;
        cancelAnimationFrame(rafId);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(cur - 1); startLoop(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(cur + 1); startLoop(); });
    dots.forEach((d, i) => {
        d.addEventListener('click', () => { goTo(i); startLoop(); });
    });

    if (carousel) {
        carousel.addEventListener('mouseenter', pauseLoop);
        carousel.addEventListener('mouseleave', startLoop);
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { goTo(cur - 1); startLoop(); }
            if (e.key === 'ArrowRight') { goTo(cur + 1); startLoop(); }
        });
    }

    startLoop();
    
    return () => { cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="home-wrapper">
{/* Notice ticker */}
    <div className="n-notice-ticker" aria-label="Latest announcements" role="marquee">
        <div className="n-notice-belt">
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/Women's Day notice-2026.pdf" target="_blank">Women's Day Notice — 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/samanvya.jpeg" target="_blank">SAMNVAYA: National Symposium on Universal Human
                    Values — 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/Inspiron2026 A National Level Technical Symposium.jpeg" target="_blank">Inspiron
                    2026 — National Level Technical Symposium</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <a href="showallexamcell.php">III B.Tech. II Sem (R-23) I Mid Timetable — Feb 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <a href="showallexamcell.php">II B.Tech. II Sem (R-23) I Mid Timetable — Feb 2026</a>
                <span className="n-sep">|</span>
            </span>
            {/* SET B — duplicate for seamless loop */}
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/Women's Day notice-2026.pdf" target="_blank">Women's Day Notice — 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/samanvya.jpeg" target="_blank">SAMNVAYA: National Symposium on Universal Human
                    Values — 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <span className="n-ub-new">New</span>
                <a href="/images/Events/Inspiron2026 A National Level Technical Symposium.jpeg" target="_blank">Inspiron
                    2026 — National Level Technical Symposium</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <a href="showallexamcell.php">III B.Tech. II Sem (R-23) I Mid Timetable — Feb 2026</a>
                <span className="n-sep">|</span>
            </span>
            <span className="n-notice-belt-item">
                <a href="showallexamcell.php">II B.Tech. II Sem (R-23) I Mid Timetable — Feb 2026</a>
                <span className="n-sep">|</span>
            </span>
        </div>
    </div>


    {/* ═══════════════════════════════════════════
         HERO
         ═══════════════════════════════════════════ */}
    <section id="home" className="n-hero" aria-label="Hero banner">
        <div className="n-hero-bg" role="img" aria-label="NBKRIST campus aerial view"></div>
        <div className="n-hero-overlay"></div>
        <div className="n-hero-content">
            <p className="n-hero-badge">
                <i className="bi bi-award-fill"></i>
                NAAC 'A' Grade &nbsp;·&nbsp; NBA Accredited &nbsp;·&nbsp; Autonomous
            </p>
            <h1 className="n-hero-title">
                Engineering <em>Excellence</em><br />Since 1979
            </h1>
            <p className="n-hero-sub">
                NBKR Institute of Science &amp; Technology, Vidyanagar — shaping engineers
                and innovators for a rapidly evolving world. Affiliated to JNTUA, Ananthapuramu.
            </p>
            <div className="n-hero-actions">
                <a href="admission3.php" className="n-btn n-btn-primary">
                    <i className="bi bi-journal-text"></i> Explore Programs
                </a>
                <a href="#campus" className="n-btn n-btn-outline-light">
                    <i className="bi bi-camera"></i> Campus Life
                </a>
            </div>
        </div>
    </section>


    {/* ═══════════════════════════════════════════
         STATS BAND
         ═══════════════════════════════════════════ */}
    <div className="n-stats-band" role="region" aria-label="Key statistics">
        <div className="n-stats-grid">
            <div className="n-stat">
                <span className="n-stat-num">45+</span>
                <span className="n-stat-lbl">Years of Excellence</span>
            </div>
            <div className="n-stat">
                <span className="n-stat-num">7</span>
                <span className="n-stat-lbl">Departments</span>
            </div>
            <div className="n-stat">
                <span className="n-stat-num">150+</span>
                <span className="n-stat-lbl">Faculty Members</span>
            </div>
            <div className="n-stat">
                <span className="n-stat-num">44K+</span>
                <span className="n-stat-lbl">Library Books</span>
            </div>
            <div className="n-stat">
                <span className="n-stat-num">100+</span>
                <span className="n-stat-lbl">Placement Partners</span>
            </div>
        </div>
    </div>


    {/* ═══════════════════════════════════════════
         ACHIEVEMENTS CAROUSEL — bg-lt
         ═══════════════════════════════════════════ */}
    <section id="achievements" className="n-section bg-lt" aria-label="Achievements">
        <div className="n-container">
            <div className="text-center">
                <p className="n-label">Highlights</p>
                <h2 className="n-heading">Recent Achievements</h2>
                <div className="n-divider center"></div>
            </div>

            <div className="n-achieve-carousel" id="achieveCarousel" tabIndex={0}>
                <div className="n-achieve-progress">
                    <div className="n-achieve-progress-fill" id="achieveProgress"></div>
                </div>

                <div className="n-achieve-track" id="achieveTrack">
                    <div className="n-achieve-slide">
                        <img src="/images/scroll/mixed.jpg" alt="NBKRIST Campus" />
                        <span className="n-achieve-badge">Campus</span>
                        <div className="n-achieve-body">
                            <h6>NBKRIST — Excellence Across Every Discipline</h6>
                            <p>A vibrant campus life blending academics, sports, NCC, and national-level competitions.
                            </p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/sports/Naval200625.jpeg" alt="Naval NCC Camp"
                            onError={(e) => { e.target.src='/images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">NCC Naval</span>
                        <div className="n-achieve-body">
                            <h6>Naval NCC Unit — Camp Activity 2025</h6>
                            <p>NBKRIST Naval NCC cadets participating in national camp activities, showcasing discipline
                                and excellence.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/images/scroll/Ncc7325.jpg" alt="NCC Group" onError={(e) => { this.src='images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">NCC</span>
                        <div className="n-achieve-body">
                            <h6>NBKRIST NCC Unit — National Representation</h6>
                            <p>Our NCC cadets proudly representing NBKRIST at state and national level events.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/sports/NCC24-09-24.jpeg" alt="NCC Medal" onError={(e) => { this.src='images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">Achievement</span>
                        <div className="n-achieve-body">
                            <h6>All India Nau Sainik Camp — Medal 2024</h6>
                            <p>Congratulations to Leading Cadet B. Mahidhar Reddy, who won a medal at the All India Nau
                                Sainik Camp held at Lonavala, Mumbai.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/sports/NCC0205242.jpeg" alt="NCC Parade" onError={(e) => { this.src='images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">NCC</span>
                        <div className="n-achieve-body">
                            <h6>NBKRIST NCC — Parade &amp; Drill Excellence</h6>
                            <p>Cadets demonstrating impeccable discipline and drill precision at the NCC parade event.
                            </p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/sports/23-12-24-Ncc.jpeg" alt="Kashmir NCC Camp"
                            onError={(e) => { e.target.src='/images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">NCC</span>
                        <div className="n-achieve-body">
                            <h6>Special National Integration Camp — Kashmir</h6>
                            <p>Appreciation to Petty Officer M. Venugopal for his outstanding performance at the Special
                                National Integration Camp held in Kashmir.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/sports/NCC(16-04-24).jpg" alt="Naval NCC Inspection"
                            onError={(e) => { e.target.src='/images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">NCC Naval</span>
                        <div className="n-achieve-body">
                            <h6>Naval Unit NCC — CO Visit &amp; Inspection</h6>
                            <p>NBKRIST Naval Unit NCC visit and official inspection by Commanding Officer Lt. Cdr.
                                Ganesh Godamgave.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/images/scroll/JEC.jpg" alt="Meidensha Skill Transfer"
                            onError={(e) => { this.src='images/4sciences-min.jpg' }} />
                        <span className="n-achieve-badge">Industry</span>
                        <div className="n-achieve-body">
                            <h6>Meidensha Corporation — Skill Transfer Program</h6>
                            <p>Meidensha Corporation, Japan conducted an exclusive Skill Transfer Program at NBKRIST on
                                16-04-2025, offering students global industry exposure.</p>
                        </div>
                    </div>
                    <div className="n-achieve-slide">
                        <img src="/images/scroll/wallmart.jpg" alt="Walmart Internship"
                            onError={(e) => { e.target.src='/images/2cse-min.jpg' }} />
                        <span className="n-achieve-badge">Internship</span>
                        <div className="n-achieve-body">
                            <h6>Walmart Internship — ₹1 Lakh / Month</h6>
                            <p>Ms. K. Indupriya of III B.Tech CSE has secured a paid internship at Walmart Inc., earning
                                ₹1 Lakh per month — one of the region's highest-paying student internships.</p>
                        </div>
                    </div>
                </div>

                <div className="n-achieve-controls">
                    <div className="n-achieve-dots" id="achieveDots">
                        <button className="n-achieve-dot active" aria-label="Slide 1"></button>
                        <button className="n-achieve-dot" aria-label="Slide 2"></button>
                        <button className="n-achieve-dot" aria-label="Slide 3"></button>
                        <button className="n-achieve-dot" aria-label="Slide 4"></button>
                        <button className="n-achieve-dot" aria-label="Slide 5"></button>
                        <button className="n-achieve-dot" aria-label="Slide 6"></button>
                        <button className="n-achieve-dot" aria-label="Slide 7"></button>
                        <button className="n-achieve-dot" aria-label="Slide 8"></button>
                        <button className="n-achieve-dot" aria-label="Slide 9"></button>
                    </div>
                    <div className="n-achieve-arrows">
                        <button className="n-achieve-arr" id="achievePrev" aria-label="Previous">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <button className="n-achieve-arr" id="achieveNext" aria-label="Next">
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {/* ═══════════════════════════════════════════
         DEPARTMENTS & PROGRAMS — Immersive tile grid
         ═══════════════════════════════════════════ */}
    <section id="courses" className="n-section bg-w" aria-label="Departments">
        <div className="n-container">
            <div className="text-center">
                <p className="n-label">Academics</p>
                <h2 className="n-heading">Departments &amp; Programs</h2>
                <div className="n-divider center"></div>
                <p className="n-sub center">
                    Seven full-fledged engineering departments with modern labs,
                    experienced faculty, and industry-aligned curriculum.
                </p>
            </div>

            <div className="n-dept-grid">

                {/* Featured: AI & Data Science */}
                <div className="n-dept-tile featured" onClick={() => navigate('/department/it')}>
                    <img src="/images/ds.jpg" alt="AI &amp; Data Science" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">Featured</span>
                        <h4>AI &amp; Data Science</h4>
                        <p>Step up &amp; Transform — Build intelligent systems with machine learning, big data, and modern analytics.</p>
                        <Link to="/department/it" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Explore Department <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* CSE */}
                <div className="n-dept-tile" onClick={() => navigate('/department/cse')}>
                    <img src="/images/2cse-min.jpg" alt="Computer Science Engineering" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">CSE</span>
                        <h4>Computer Science Engineering</h4>
                        <p>Learning never exhausts the mind.</p>
                        <Link to="/department/cse" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* ECE */}
                <div className="n-dept-tile" onClick={() => navigate('/department/ece')}>
                    <img src="/images/7ece-min.jpg" alt="Electronics &amp; Communication" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">ECE</span>
                        <h4>Electronics &amp; Communication</h4>
                        <p>No Resistance can drop our Potential.</p>
                        <Link to="/department/ece" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* Civil */}
                <div className="n-dept-tile" onClick={() => navigate('/department/civ')}>
                    <img src="/images/11civil-min.jpg" alt="Civil Engineering" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">Civil</span>
                        <h4>Civil Engineering</h4>
                        <p>We Step up, We Transform.</p>
                        <Link to="/department/civ" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* EEE */}
                <div className="n-dept-tile" onClick={() => navigate('/department/eee')}>
                    <img src="/images/4sciences-min.jpg" alt="Electrical &amp; Electronics" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">EEE</span>
                        <h4>Electrical &amp; Electronics</h4>
                        <p>Peace Amplified, World Rectified.</p>
                        <Link to="/department/eee" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* Mechanical */}
                <div className="n-dept-tile" onClick={() => navigate('/department/mech')}>
                    <img src="/images/17mech-min.jpg" alt="Mechanical Engineering" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">Mech</span>
                        <h4>Mechanical Engineering</h4>
                        <p>Less Energy, Greater Efficiency.</p>
                        <Link to="/department/mech" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* Sciences & Humanities */}
                <div className="n-dept-tile" onClick={() => navigate('/department/sh')}>
                    <img src="/images/1humanities-min.jpg" alt="Sciences &amp; Humanities" />
                    <div className="n-dept-tile-body">
                        <span className="n-dept-tile-tag">S&amp;H</span>
                        <h4>Sciences &amp; Humanities</h4>
                        <p>The foundation of all engineering.</p>
                        <Link to="/department/sh" className="n-dept-link" onClick={(e) => e.stopPropagation()}>
                            Learn more <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                {/* Placement CTA tile */}
                <div className="n-dept-tile cta-tile">
                    <i className="bi bi-briefcase-fill"></i>
                    <h5>Placement &amp; Careers</h5>
                    <p>100+ top recruiters, every year.</p>
                    <a href="pcell.php" className="n-btn n-btn-dark n-btn-sm">
                        Placement Cell <i className="bi bi-arrow-right"></i>
                    </a>
                </div>

            </div>
        </div>
    </section>


    {/* ═══════════════════════════════════════════
         RECRUITERS — bg-dk
         ═══════════════════════════════════════════ */}
    <section id="recruiters" className="n-section bg-dk" aria-label="Our recruiters">
        <div className="n-container text-center">
            <p className="n-label">Placements</p>
            <h2 className="n-heading light">Our Recruiters</h2>
            <div className="n-divider center"></div>
            <p className="n-sub light center">
                Top companies across IT, core engineering, and analytics partner with NBKRIST every year.
            </p>
        </div>

        <div className="n-rec-track">
            <div className="n-rec-wrap">
                <div className="n-rec-item"><img src="/images/company_logos/wipro.png" alt="Wipro" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/valuelabs.png" alt="ValueLabs" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/tcs.png" alt="TCS" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/sutherland.jpg" alt="Sutherland" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/infosys.png" alt="Infosys" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/eleation.jpg" alt="Eleation" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/cog_com.png" alt="Cognizant" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/mphasis.png" alt="Mphasis" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/justdial.png" alt="JustDial" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/wipro.png" alt="Wipro" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/valuelabs.png" alt="ValueLabs" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/tcs.png" alt="TCS" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/sutherland.jpg" alt="Sutherland" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/infosys.png" alt="Infosys" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/eleation.jpg" alt="Eleation" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/cog_com.png" alt="Cognizant" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/mphasis.png" alt="Mphasis" /></div>
                <div className="n-rec-item"><img src="/images/company_logos/justdial.png" alt="JustDial" /></div>
            </div>
        </div>
    </section>


    {/* ═══════════════════════════════════════════
         EXPLORE CAMPUS — Bento mosaic (bg-lt)
         ═══════════════════════════════════════════ */}
    <section id="campus" className="n-section bg-lt" aria-label="Explore campus">
        <div className="n-container">
            <div className="text-center">
                <p className="n-label">Campus Life</p>
                <h2 className="n-heading">Explore NBKRIST</h2>
                <div className="n-divider center"></div>
                <p className="n-sub center">
                    A campus built for growth — inside the classroom and far beyond it.
                </p>
            </div>

            <div className="n-campus-bento">

                {/* Library — large left cell */}
                <div className="n-campus-cell row-span-2">
                    <img src="/library/libr1(2).jpg" alt="Central Library" onError={(e) => { this.src='images/2cse-min.jpg' }} />
                    <div className="n-campus-cell-body">
                        <div className="n-campus-cell-icon"><i className="bi bi-book-fill"></i></div>
                        <h5>Central Library</h5>
                        <p>Over 44,197 books, 267 periodicals, and a rich digital collection spanning all engineering
                            disciplines. A modern, quiet space built for deep learning.</p>
                        <a href="library.php" className="n-campus-cell-link">
                            Visit Library <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>

                {/* Placements — top right */}
                <div className="n-campus-cell">
                    <img src="/images/2cse-min.jpg" alt="Placements &amp; Internships" />
                    <div className="n-campus-cell-body">
                        <div className="n-campus-cell-icon"><i className="bi bi-briefcase-fill"></i></div>
                        <h5>Placements &amp; Internships</h5>
                        <p>Our CDPC connects students with 100+ leading companies every year across IT, core
                            engineering, and analytics.</p>
                        <a href="pcell.php" className="n-campus-cell-link">
                            Placement Cell <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>

                {/* Stats tile */}
                <div className="n-campus-cell stat-cell">
                    <div className="n-campus-cell-body">
                        <span className="n-campus-stat-num">100+</span>
                        <span className="n-campus-stat-lbl">Placement Partners</span>
                    </div>
                </div>

                {/* Sports — bottom left of right column */}
                <div className="n-campus-cell col-span-2">
                    <img src="/images/SLVS_959.jpg" alt="Sports &amp; Club Activities"
                        onError={(e) => { this.src='images/1humanities-min.jpg' }} />
                    <div className="n-campus-cell-body">
                        <div className="n-campus-cell-icon"><i className="bi bi-trophy-fill"></i></div>
                        <h5>Sports &amp; Club Activities</h5>
                        <p>From NCC, NSS, and national sports competitions to coding clubs, cultural societies, and
                            literary guilds — NBKRIST nurtures the complete individual.</p>
                        <a href="sportsdepartment.php" className="n-campus-cell-link">
                            Sports &amp; Clubs <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>


    {/* ═══════════════════════════════════════════
         ADMINISTRATION + TESTIMONIALS — Dark bg
         ═══════════════════════════════════════════ */}
    <section className="n-admin-section" aria-label="Administration and testimonials">
        <div className="n-admin-inner">

            <div className="n-admin-grid">

                {/* Leadership */}
                <div>
                    <p className="n-leadership-label">Leadership</p>
                    <h2 className="n-leadership-heading">Our Administration</h2>
                    <div className="n-divider" style={{marginBottom: '14px'}}></div>
                    <p className="n-leadership-sub">
                        The leadership team guiding institutional growth and academic excellence at NBKRIST.
                    </p>

                    <div className="n-person-cards">
                        <div className="n-person-card">
                            <img src="/images/1.jpg" alt="Chairman" className="n-person-photo"
                                onError={(e) => { e.target.src='/images/Emb.jpg' }} />
                            <div className="n-person-info">
                                <span className="n-person-role">Chairman</span>
                                <span className="n-person-name">Dr. Y Venkatarami Reddy</span>
                                <span className="n-person-dept">NBKR Educational Society</span>
                            </div>
                        </div>
                        <div className="n-person-card">
                            <img src="/images/2.jpg" alt="Correspondent" className="n-person-photo"
                                onError={(e) => { e.target.src='/images/Emb.jpg' }} />
                            <div className="n-person-info">
                                <span className="n-person-role">Correspondent</span>
                                <span className="n-person-name">Nedurumalli Ramkumar</span>
                                <span className="n-person-dept">NBKR Educational Society</span>
                            </div>
                        </div>
                        <div className="n-person-card">
                            <img src="/images/3.jpg" alt="Director" className="n-person-photo"
                                onError={(e) => { e.target.src='/images/Emb.jpg' }} />
                            <div className="n-person-info">
                                <span className="n-person-role">Director</span>
                                <span className="n-person-name">Dr. V. Vijaya Kumar Reddy</span>
                                <span className="n-person-dept">NBKRIST</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div>
                    <p className="n-leadership-label">Student Voices</p>
                    <h2 className="n-testi-heading">What Our Students Say</h2>
                    <div className="n-divider" style={{marginBottom: '0'}}></div>

                    <div className="n-testi-cards">
                        <div className="n-testi-card">
                            <blockquote>
                                "NBKRIST gave me the technical depth and confidence to land my dream placement.
                                The faculty and labs are truly world-class."
                            </blockquote>
                            <div className="n-testi-meta">
                                <div className="n-testi-avatar">SS</div>
                                <div>
                                    <cite>Shaik Safeena</cite>
                                    <small>III B.Tech CSE AI&amp;ML</small>
                                </div>
                                <span className="n-testi-stars">★★★★★</span>
                            </div>
                        </div>
                        <div className="n-testi-card">
                            <blockquote>
                                "The supportive environment and hands-on projects shaped me into a problem-solver.
                                I'm proud to be an NBKRIST alumna."
                            </blockquote>
                            <div className="n-testi-meta">
                                <div className="n-testi-avatar">YS</div>
                                <div>
                                    <cite>Yempuluru Sai Sathwik</cite>
                                    <small>III B.Tech CSE AI/ML — 2023 Batch</small>
                                </div>
                                <span className="n-testi-stars">★★★★★</span>
                            </div>
                        </div>
                        <div className="n-testi-card">
                            <blockquote>
                                "The campus helped me grow through NCC, technical events, and leadership activities
                                that no other college offered."
                            </blockquote>
                            <div className="n-testi-meta">
                                <div className="n-testi-avatar">AN</div>
                                <div>
                                    <cite>A Neetu Reddy</cite>
                                    <small>III B.Tech Data Science</small>
                                </div>
                                <span className="n-testi-stars">★★★★★</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    
    </div>
  );
};

export default Home;