import { Request, Response } from "express";
import { Error, SuccessMessage } from "../models/types";
import { cryptos } from "../resources/resources";

export const cryptosController = {
  getCryptos: async (
    req: Request,
    res: Response<
      | { nickname: string }
      | Error
      | any
      | (SuccessMessage & { id: number } & SuccessMessage)
    >
  ) => {
    return res.json(cryptos.length > 0 ? cryptos.at(-1) : []);
  },
};
