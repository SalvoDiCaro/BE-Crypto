import { Request, Response } from "express";
import {
  Error,
  SuccessMessage,
} from "../models/types";

export const favoritesController = {
  setFavorites: async (
    { body }: Request<{}, {}, { character: string }>,
    res: Response<
      | { nickname: string }
      | Error
      | any
      | (SuccessMessage & { id: number } & SuccessMessage)
    >
  ) => {},
  getFavorites: async (
    req: Request,
    res: Response<
      | { nickname: string }
      | Error
      | any
      | (SuccessMessage & { id: number } & SuccessMessage)
    >
  ) => {
    res.json({ message: "deleted" });
  },
};
