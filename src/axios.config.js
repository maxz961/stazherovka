const axios = require('axios');
export default axios.create({
    baseURL:  'http://c8bc0917.ngrok.io',
    headers: {'x-access-token': `Bearer ${window.localStorage.getItem('rr_login')}`}
});
