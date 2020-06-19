import axios from '@axios';
export default {
  get(url, req = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: req
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
        });
    });
  },
  post(url, req = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, req).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
        });
    });
  }
}