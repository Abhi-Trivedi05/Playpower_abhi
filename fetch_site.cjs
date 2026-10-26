const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'airbnb-clone-umber-two.vercel.app',
  path: '/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('vercel_dump.html', data);
    console.log('Saved vercel_dump.html, size:', data.length);
  });
}).on('error', err => {
  console.error(err);
});
