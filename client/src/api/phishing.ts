import axios from "axios";
import { PhishingAttempt } from "../types";

const API_URL = "http://localhost:3000/manage-phishing";

export const sendPhishingEmail = (email: string, token: string) => {
  return axios.post(
    `${API_URL}/send?email=${email}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAllAttempts = (token: string) => {
  return axios.get<PhishingAttempt[]>(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
