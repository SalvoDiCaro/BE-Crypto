import { Request, Response } from "express";
import {
  Error,
  SuccessMessage,
} from "../models/types";
import { User } from "../models/user";
import { db } from "../index";
import { formatResp } from "../utils/firebase";
import jwt from "jsonwebtoken";
import { typeCryptographyJwt } from "../configurations/config";
import { readFile, users, writeFile } from "../resources/resources";

export const usersController = {
  signUp: async (
    { body }: Request<{}, {}, Omit<User, "id">>,
    res: Response<
      | { nickname: string }
      | Error
      | SuccessMessage
      | (User & { id: number } & SuccessMessage)
    >
  ) => {
    const { nickname, password } = body;
    if (!nickname || !password)
      return res.status(404).json({ error: "Invalid request!" });


    if (users.some(({ nickname: nicknameUser }) => nicknameUser === nickname))
      return res.status(404).json({ error: "Nickname already used!" });
      users.push(body);
      await writeFile("users", body)

    res.json(body);
  },
  signIn: async (
    { body }: Request<{}, {}, User, "nickname" | "password">,
    res: Response<
      | User
      | Error
      | SuccessMessage
      | ({ user: User["nickname"], token: string })
    >
  ) => {
    const { nickname, password } = body;

    if (!nickname || !password)
      return res.status(404).json({ error: "Invalid request!" });

    let findUser= users.find(
      ({ nickname: nicknameUser, password: passwordUser }) =>
        nicknameUser === nickname && passwordUser === password
    );

    if (!findUser) return res.status(404).json({ error: "Wrong credentials!" });
    res.json({
      user: findUser.nickname,
      token: `Bearer ${jwt.sign(body, typeCryptographyJwt)}`,
    });
  },
};
