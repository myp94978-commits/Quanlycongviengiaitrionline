const axios = require('axios');

(async () => {
  const baseUrl = 'http://localhost:5000/api';
  const payload = {
    customer_name: 'Test',
    address: '123 test',
    phone: '0123456789',
    email: 'test@example.com',
    total: 100,
    note: 'test note',
    status: 0,
    trash: 0,
    details: [{ product_id: 1, product_name: 'X', product_image: '', price: 100, quantity: 1 }]
  };

  const tests = [
    {
      name: 'JSON',
      body: payload,
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'JSON wrapper',
      body: { data: payload },
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'URL-encoded',
      body: new URLSearchParams(Object.entries(payload).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)])),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  ];

  for (const test of tests) {
    try {
      const res = await axios.post(`${baseUrl}/orders`, test.body, { headers: test.headers });
      console.log(`${test.name} success`, res.status, res.data);
    } catch (e) {
      console.log(`${test.name} failed`);
      if (e.response) {
        console.log(' status', e.response.status);
        console.log(' headers', e.response.headers['content-type']);
        console.log(' data', JSON.stringify(e.response.data));
      } else {
        console.log(' error', e.message);
      }
    }
    console.log('---');
  }
})();