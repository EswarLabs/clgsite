import fs from 'fs';

const php = fs.readFileSync('c:/xampp/htdocs/nbkrist_site/index.php', 'utf8');
const start = php.indexOf('<!-- Notice ticker -->');
const end = php.indexOf("<?php require_once 'includes/footer.php'; ?>");

let html = php.slice(start, end);

html = html.replace(/class=/g, 'className=')
           .replace(/for=/g, 'htmlFor=')
           .replace(/<!--/g, '{/*')
           .replace(/-->/g, '*/}')
           .replace(/onclick=/g, 'onClick=');

html = html.replace(/<img([\s\S]*?)>/g, (m, p1) => {
    if(p1.trim().endsWith('/')) return m;
    return '<img' + p1 + ' />';
});

html = html.replace(/<br>/g, '<br />');

html = html.replace(/<hr([\s\S]*?)>/g, (m, p1) => {
    if(p1.trim().endsWith('/')) return m;
    return '<hr' + p1 + ' />';
});

html = html.replace(/onerror=\"(.*?)\"/g, (match, p1) => {
    return 'onError={(e) => { ' + p1 + ' }}';
});

html = html.replace(/style=\"([^"]*)\"/g, (match, p1) => {
    const styles = p1.split(';').filter(Boolean).map(s => {
        const [k, v] = s.split(':');
        if (!k || !v) return '';
        const camel = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${camel}: '${v.trim().replace(/'/g, "\\'")}'`;
    }).join(', ');
    return `style={{${styles}}}`;
});

html = html.replace(/onclick=\"(.*?)\"/g, (match, p1) => {
    return 'onClick={() => { ' + p1 + ' }}';
});


const jsx = `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
${html}
    </div>
  );
};

export default Home;`;

fs.writeFileSync('c:/xampp/htdocs/nbkrist_site/react-frontend/src/pages/Home.jsx', jsx);
