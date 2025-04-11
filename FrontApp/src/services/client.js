import axios from 'axios';

export const HTTPClient = axios.create({
  baseURL: 'http://localhost:5221',
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  }
});

export const URL_BASE_IMAGEM = "https://cdn.corenexis.com/view/?img=m/ap11/";