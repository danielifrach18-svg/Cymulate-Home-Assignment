import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const loginUser = (email: string, password: string) => {
  return axios.post<{ token: string }>(`${API_URL}/auth/login`, {
    email,
    password,
  });
};
