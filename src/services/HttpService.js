import axios from "axios";

export const http = axios.create({
  baseURL: "https://deerbank.herokuapp.com/",
  headers: {
    Authorization: 'Token '+localStorage.getItem('token')
  }
});

export const setToken = (token) => {
  const { headers } = http.defaults;
  localStorage.setItem('token', token);
  http.defaults.headers = {
    ...headers,
    Authorization: `Token ${token}`,
  };
};
