import axios from "axios";
import { PhishingAttempt } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const sendPhishingEmail = (email: string, token: string) => {
  return axios.post(
    `${API_URL}/manage-phishing/send?email=${email}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAllAttempts = (token: string) => {
  return axios.get<PhishingAttempt[]>(`${API_URL}/manage-phishing/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
