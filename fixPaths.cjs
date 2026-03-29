const fs = require('fs');

let code = fs.readFileSync('c:/xampp/htdocs/nbkrist_site/react-frontend/src/pages/Home.jsx', 'utf8');

// Replace relative paths that start with known asset folders 
code = code.replace(/src="(images|sports|library|Admissions|css|pdf)\//g, 'src="/$1/');
code = code.replace(/href="(images|sports|library|Admissions|css|pdf)\//g, 'href="/$1/');

// Also replace simple 'src="images/..."' just in case.
fs.writeFileSync('c:/xampp/htdocs/nbkrist_site/react-frontend/src/pages/Home.jsx', code);
console.log('Fixed paths inside Home.jsx');
