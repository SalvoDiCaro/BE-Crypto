import { Request, Response } from "express";
import {
  Error,
  SuccessMessage,
} from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { cryptos, trading, writeFile } from "../resources/resources";

export interface Trading {
  userId: string;
  price_timestamp: Date;
  price: string;
  crypto: string;
  amount: number;
  id: string;
}
export const tradingController = {
  getTrading: async (
    req: Request<{ id: string }>,
    res: Response<
      | { nickname: string }
      | Error
      | any
      | (SuccessMessage & { id: number } & SuccessMessage)
    >
  ) => {
    const t = cryptos;
    const lastValueCryptos = cryptos.at(-1);

    const tt = lastValueCryptos!
      .filter(({ id }) =>
        trading.some(({ crypto: idCrypto }) => id === idCrypto)
      )
      .map((item) => {
        const t = trading.find(({ crypto }) => crypto === item.id);
        if (!t) return res.status(404).json("");
        return {
          ...item,
          ...{
            trading_timestamp: t.price_timestamp,
            amount: t.amount,
            userId: t.userId,
            trading__crypto_price: t.price,
            idTrading: t.id,
          },
        };
      });
    return res.json(tt);
  },
  addTrading: async (
    {
      body,
    }: Request<{}, {}, { amount: number; idCrypto: string; userId: string }>,
    res: Response<
      | { nickname: string }
      | Error
      | any
      | (SuccessMessage & { id: number } & SuccessMessage)
    >
  ) => {
    const { amount, idCrypto, userId } = body;

    const resp = cryptos.at(-1);
    const { price, price_timestamp } = resp!.find(({ id }) => id === idCrypto)!;
    const newTrading = {
      userId,
      amount,
      crypto: idCrypto,
      price,
      price_timestamp,
      id: uuidv4(),
    };
    await writeFile("trading", newTrading);
    trading.push(newTrading);
    return res.json(newTrading);
  },
};
