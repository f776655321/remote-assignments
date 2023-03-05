import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://35.77.148.148/api'
})
export default instance