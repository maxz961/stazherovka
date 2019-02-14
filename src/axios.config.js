const axios = require('axios');
// const URL = 'http://localhost:4000/'
URL = 'http://192.168.88.189:4000'
export default {
    request(){
        console.log(window.localStorage.getItem('rr_login'))
      return axios.create({
            baseURL: URL ,
            headers: {'x-access-token': `Bearer ${window.localStorage.getItem('rr_login')}`}
        });
    }
}

