import { MessageError } from "./messageError";

type HeaderAxiosRequestConfig = {
  Accept: string;
  "x-api-key": string;
};

export type Types = {
  array: "array";
  string: "string";
};

export interface ObjectReduce {
  netValue: number;
  taxedValue: number;
}

export type AxiosOption = {
  method: string;
  url: string;
  headers: HeaderAxiosRequestConfig;
};

export type Error = {
  error: MessageError;
};

export type SuccessMessage = {
  message: "ok";
};

export type BadMessage = {
  message: "bad!";
};
