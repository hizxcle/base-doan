import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://localhost:2222/api/',
});
