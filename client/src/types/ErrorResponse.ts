import { AxiosError } from "axios";

export interface ServerError {
  message: string;
}

export type TypedAxiosError = AxiosError<ServerError>;
