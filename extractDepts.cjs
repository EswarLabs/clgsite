const fs = require('fs');
const path = require('path');

const baseDir = 'c:/xampp/htdocs/nbkrist_site';
const files = [
    { name: 'CIV-Departmentnewupdated.php', id: 'civ', facultyId: '2' },
    { name: 'CSE-Departmentnewupdated.php', id: 'cse', facultyId: '6' },
    { name: 'ECE-Departmentnewupdated.php', id: 'ece', facultyId: '4' },
    { name: 'EEE-Departmentnewupdated.php', id: 'eee', facultyId: '5' },
    { name: 'IT-Departmentnewupdated.php', id: 'it', facultyId: '7' },
    { name: 'MECH-Departmentnewupdated.php', id: 'mech', facultyId: '3' },
    { name: 'sh-departmentnewupdated.php', id: 'sh', facultyId: '1' }
];

const data = {};

function cleanHtml(html, deptId) {
    if (!html) return '';
    let h = html.trim();
    
    // Remove scripts and styles
    h = h.replace(/<script[\s\S]*?<\/script>/gi, '');
    h = h.replace(/<style[\s\S]*?<\/style>/gi, '');

    const killPatterns = [
        /<!--[\s\S]*?-->/g,
        /<header[\s\S]*?<\/header>/gi,
        /<footer[\s\S]*?<\/footer>/gi,
        /<nav[\s\S]*?<\/nav>/gi,
        /<\/header>/gi,
        /<\/footer>/gi,
        /<\/nav>/gi,
        /<!DOCTYPE html>[\s\S]*?<body[^>]*>/gi,
        /<\/body>[\s\S]*?<\/html>/gi,
        /<div[^>]*class="[^"]*n-page-hero[^"]*"[\s\S]*?<\/div>/gi,
        /<div[^>]*class="[^"]*n-dept-sidebar[^"]*"[\s\S]*?<\/div>/gi,
        /<div[^>]*id="page-sidebar"[\s\S]*?<\/div>/gi,
        /<\?php include.*? \?>/gi,
        /<\?php[\s\S]*?\?>/gi,
        /<marquee[\s\S]*?<\/marquee>/gi,
        /<div[^>]*class="[^"]*announcement[^"]*"[\s\S]*?<\/div>/gi,
        /<div[^>]*class="[^"]*announce-tag[^"]*"[\s\S]*?<\/div>/gi,
        /<div[^>]*class="[^"]*breadcrumb[^"]*"[\s\S]*?<\/div>/gi,
        /<ol[^>]*class="[^"]*breadcrumb[^"]*"[\s\S]*?<\/ol>/gi,
        /<div id="rum_sst_tab.*?>.*?<\/a>/gi,
        // Kill style-based heading strips that sneak into subpages
        /<h2[^>]*style="background-color:#005599[^>]*>[\s\S]*?<\/h2>/gi,
        /<div[^>]*class="n-dept-section-head"[\s\S]*?<\/div>/gi,
        /<tr>\s*<td background="\/images\/content-bttm-bg\.gif"[\s\S]*?<\/tr>/gi,
        /<tr>\s*<td background="\/images\/content-title-heading\.gif"[\s\S]*?<\/tr>/gi,
    ];

    killPatterns.forEach(p => h = h.replace(p, ''));

    // Convert Bootstrap columns to full width if they remain
    h = h.replace(/class="col-md-9"/gi, 'class="col-md-12"')
         .replace(/class="col-md-8"/gi, 'class="col-md-12"')
         .replace(/class="col-sm-9"/gi, 'class="col-sm-12"');

    // Fix asset paths
    h = h.replace(/(?:src|href)=["'](?!http|https|#|javascript:|\/)(.*?)["']/gi, (match, p1) => {
        const attr = match.startsWith('src') ? 'src' : 'href';
        return `${attr}="/${p1}"`;
    });

    // Ensure all PDF links have target="_blank"
    h = h.replace(/<a\s+([^>]*href="[^"]*\.pdf"[^>]*)>/gi, (match, body) => {
        if (!body.toLowerCase().includes('target=')) {
            return `<a target="_blank" ${body}>`;
        }
        return match;
    });

    // Remove legacy container wrappers that might cause layout gaps
    h = h.replace(/<div class="n-inner-page">/gi, '<div>')
         .replace(/<div class="n-container">/gi, '<div>')
         .replace(/<div class="container(-fluid)?">/gi, '<div>');

    // Remove messy empty tags at start/end
    h = h.trim();
    // Final pass to clean up multiple newlines
    h = h.replace(/\n\s*\n/g, '\n');
    
    return h;
}

files.forEach(f => {
    const fullPath = path.join(baseDir, f.name);
    if (!fs.existsSync(fullPath)) return;
    const content = fs.readFileSync(fullPath, 'utf8');

    const heroTitleMatch = content.match(/<div class="n-page-hero">[\s\S]*?<h1>(.*?)<\/h1>/);
    const heroTitle = heroTitleMatch ? heroTitleMatch[1].trim() : '';

    const aboutBlockStart = content.indexOf('<div class="n-dept-content-block">');
    let aboutHtml = '';
    if (aboutBlockStart !== -1) {
        // Find a safe end point. Look for stats or the next block or the end of the col-lg-9 div
        let nextMarker = content.indexOf('<div class="n-dept-stats-row"', aboutBlockStart + 30);
        if (nextMarker === -1) nextMarker = content.indexOf('<div class="n-dept-content-block" style="margin-top:28px;"', aboutBlockStart + 30);
        if (nextMarker === -1) nextMarker = content.indexOf('<!-- Courses offered table -->', aboutBlockStart + 30);
        if (nextMarker === -1) nextMarker = content.indexOf('<div id="page-sidebar"', aboutBlockStart + 30);
        
        if (nextMarker !== -1) {
            aboutHtml = content.substring(aboutBlockStart, nextMarker).trim();
            // Try to find the last closing </div> that belongs to the content block if possible, 
            // but usually this substring approach is safer as it stops before the next section.
            // Let's refine it by finding the last </div> before the marker.
            const lastDiv = aboutHtml.lastIndexOf('</div>');
            if (lastDiv !== -1 && lastDiv > aboutHtml.length - 20) {
                 // It might be the closing tag of the content block. 
                 // But wait, the aboutHtml starts WITH the opening div.
            }
        } else {
            // Fallback to the old regex but make it non-greedy and try to find a meaningful end
            const match = content.match(/<div class="n-dept-content-block">([\s\S]*?)<\/div>\s*?(?=<div|<!--|[\r\n]{2,})/);
            aboutHtml = match ? match[0] : '';
        }
    }
    
    // Remove the wrapping div if it exists to avoid double nesting in React
    aboutHtml = aboutHtml.replace(/^<div class="n-dept-content-block">/, '').replace(/<\/div>$/, '').trim();
    aboutHtml = cleanHtml(aboutHtml, f.id);

    const stats = [];
    const statMatches = content.matchAll(/<div class="n-dept-stat">[\s\S]*?<span class="n-dept-stat-num">(.*?)<\/span>[\s\S]*?<span class="n-dept-stat-lbl">(.*?)<\/span>/g);
    for (const m of statMatches) {
        stats.push({ num: m[1].trim(), label: m[2].trim() });
    }

    const courses = [];
    const courseRowsMatch = content.match(/<tbody>([\s\S]*?)<\/tbody>/);
    if (courseRowsMatch) {
        const rows = courseRowsMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g);
        for (const r of rows) {
            const cells = Array.from(r[1].matchAll(/<td>([\s\S]*?)<\/td>/g), m => m[1].trim());
            if (cells.length >= 4) {
                courses.push({ sno: cells[0], course: cells[1], branch: cells[2], intake: cells[3] });
            }
        }
    }

    const sidebarLinks = [];
    const subPages = {};
    const sidebarMatch = content.match(/<ul class="n-dept-sidebar-links">([\s\S]*?)<\/ul>/);
    
    if (sidebarMatch) {
       const linksHtml = sidebarMatch[1];
       const aMatchesArray = Array.from(linksHtml.matchAll(/<a\s+href="(.*?)"(.*?)>([\s\S]*?)<\/a>/gi));
       
       aMatchesArray.forEach(a => {
           let href = a[1];
           let label = a[3].replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
           const cleanLabel = label.replace(/<[^>]*>?/gm, '').toLowerCase().trim();
           
           // Skip common duplicate links
           if (cleanLabel === 'home' || cleanLabel === 'about department' || cleanLabel === 'nbkr ist home' || cleanLabel === 'nbkrist home' || cleanLabel === 'nbkr home') return;

           if (href.includes('javascript:setValues')) {
              const m = href.match(/setValues\(\s*['"](\d+)['"]\s*,\s*['"](.*?)['"]\s*\)/);
              if (m) {
                 href = `/department/${f.id}/faculty-${m[1]}`;
                 sidebarLinks.push({ href, label });
                 return;
              }
           }
           
           if (href.includes('javascript:')) return;
           
           if (href.endsWith('.php') && href !== f.name && !href.startsWith('http')) {
               let subSlug = href.replace('.php', '').toLowerCase();
               let shortSlug = subSlug.replace(f.id, '').replace('department', '').replace('dept', '').replace(/^-/, '').replace(/-$/, '');
               if (!shortSlug || shortSlug.length < 2) shortSlug = subSlug;

               const subPath = path.join(baseDir, href);
               if (fs.existsSync(subPath)) {
                   const subContent = fs.readFileSync(subPath, 'utf8');
                   let rawHtml = '';
                   
                   const markers = [
                       '<!-- ── Page Content ── -->',
                       '<div class="col-md-9"',
                       '<div id="page-main"',
                       '<div class="col-lg-9"',
                       '<div class="n-dept-content-block"',
                       '<div class="container-fluid -page"',
                       '<main'
                   ];
                   
                   let startIdx = -1;
                   for (const m of markers) {
                       const idx = subContent.indexOf(m);
                       if (idx !== -1) {
                           const pos = idx + (m.startsWith('<') ? 0 : m.length);
                           if (pos > startIdx) startIdx = pos;
                       }
                   }

                   if (startIdx !== -1) {
                       rawHtml = subContent.substring(startIdx);
                       
                       const endMarkers = [
                           '<!-- ── Footer ── -->',
                           "<?php include 'includes/footer.php'; ?>",
                           '</body>',
                           '</html>',
                           '<footer'
                       ];
                       
                       let endIdx = -1;
                       for (const em of endMarkers) {
                           const idx = rawHtml.indexOf(em);
                           if (idx !== -1) {
                               if (endIdx === -1 || idx < endIdx) endIdx = idx;
                           }
                       }
                       
                       if (endIdx !== -1) {
                           rawHtml = rawHtml.substring(0, endIdx);
                       }
                   }
                   
                   const cleanedHtml = cleanHtml(rawHtml, f.id);
                   if (cleanedHtml && cleanedHtml.length > 20) {
                       subPages[shortSlug] = cleanedHtml;
                       href = `/department/${f.id}/${shortSlug}`;
                   }
               } else {
                   href = `/department/${f.id}/${shortSlug}`;
               }
           }
           if (href.includes('.pdf') && !href.startsWith('http') && !href.startsWith('/')) {
               href = '/' + href;
           }
           sidebarLinks.push({ href: href, label: label });
       });
    }

    data[f.id] = { id: f.id, facultyId: f.facultyId, heroTitle, aboutHtml, stats, courses, sidebarLinks, subPages };
});

const output = `export const departmentsData = ${JSON.stringify(data, null, 4)};`;
fs.writeFileSync('c:/xampp/htdocs/nbkrist_site/react-frontend/src/data/departmentsData.js', output);
console.log('Departments data generated successfully.');
