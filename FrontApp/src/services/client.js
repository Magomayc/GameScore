import axios from 'axios';

export const HTTPClient = axios.create({
  baseURL: 'http://localhost:5221', 
  headers:{
    "Acess-Controll-Allow-Origins": "*",
    "Acess-Controll-Allow-Headers": "Authorization",
    "Acess-Controll-Allow-Methods": "GET, POST, OPTIONS, PUT, PATH, DELETE",
    "Content-Type": "application/json;chaset=UTF-8",
  }
});