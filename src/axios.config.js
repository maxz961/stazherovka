const axios = require('axios');
export default axios.create({
    baseURL:  'http://192.168.88.189:4000',
    // baseURL:  'http://localhost:4000/',
    headers: {'x-access-token': `Bearer ${window.localStorage.getItem('rr_login')}`}
});
