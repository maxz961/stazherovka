const axios = require('axios');
const URL = 'http://localhost:4000/'
// URL = 'http://192.168.88.189:4000'
export default {
    request(){
        
      return axios.create({
            baseURL: URL ,
            headers: {'x-access-token': `Bearer ${window.localStorage.getItem('rr_login')}`}
        });
    }
}


// const token = window.localStorage.getItem('rr_login');
//         let headers = {};
//         if(token){
//             console.log('####################');
//             headers = {'x-access-token': `Bearer ${token}`}
//             return axios.create({
//                 baseURL: URL ,
//                 headers: {...headers}
//             });
//         } else {
//             window.location.href = 'http://localhost:3000/Login';
//         }

