import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const registerUser = (email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const loginUser = (email: string, password: string) => {
  return axios.post<{ token: string }>(`${API_URL}/login`, { email, password });
};
