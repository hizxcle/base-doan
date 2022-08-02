import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:2222/api/',
});

export default request;
