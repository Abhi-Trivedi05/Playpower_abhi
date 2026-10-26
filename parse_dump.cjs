const fs = require('fs');
const html = fs.readFileSync('vercel_dump.html', 'utf8');

// Match script tags
const scripts = html.match(/<script[^>]*src="([^"]+)"[^>]*>/g);
console.log('Scripts:', scripts);

// Match inline script data or state
const inlineScripts = html.match(/<script>([\s\S]*?)<\/script>/g);
console.log('Inline scripts count:', inlineScripts ? inlineScripts.length : 0);

// Match all img tags
const imgs = html.match(/<img[^>]+src="([^">]+)"/g);
console.log('Imgs:', imgs);
