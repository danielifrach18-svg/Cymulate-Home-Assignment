export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
}

export interface PhishingFormData {
  email: string;
}

export interface PhishingAttempt {
  _id: string;
  email: string;
  subject: string;
  body: string;
  status: string;
  createdAt: string;
}
