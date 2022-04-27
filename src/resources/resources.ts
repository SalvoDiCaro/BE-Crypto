import { Trading } from "../controllers/trading";
import fs from "fs";
import { MappedCrypto } from "../models/RespCrypto";
import { User } from "../models/user";
export let trading: Array<Trading> = [];
export let cryptos: Array<MappedCrypto>[] = [];
export let favorites: Array<MappedCrypto>[] = [];
export let users: User[] = [];
export let setCryptos = (arr: Array<MappedCrypto[]>) => (cryptos = arr);
export let addFavorites = (arr: Array<MappedCrypto[]>) => (favorites = arr);

export type Files = "cryptos" | "trading" | "users";
export interface TypeFiles {
  cryptos: MappedCrypto[];
  trading: Trading[];
  favorites: MappedCrypto[];
  users: User[],
}
export const loadCryptos = async () => {
  if (!fs.existsSync("cryptos.txt")) {
    fs.createWriteStream("cryptos.txt");
    return;
  }
  var cryptos = fs.readFileSync("cryptos.txt").toString().split("\n");
  setCryptos(
    cryptos.slice(0, cryptos.length - 1).map((line) => JSON.parse(line))
  );
};
export const loadTrading = async () => {
  if (!fs.existsSync("trading.txt")) {
    fs.createWriteStream("trading.txt");
    return;
  }
  const tradingLoaded = fs.readFileSync("trading.txt").toString().split("\n");
  trading = tradingLoaded
    .slice(0, trading.length - 1)
    .map((line) => JSON.parse(line));
};
export const loadUsers = async () => {
  if (!fs.existsSync("users.txt")) {
    fs.createWriteStream("users.txt");
    return;
  }
  const usersLoaded = fs.readFileSync("users.txt").toString().split("\n");
  users = usersLoaded
    .slice(0, users.length - 1)
    .map((line) => JSON.parse(line));
};

export const readFile = <K extends Files>(name: K): TypeFiles[K] => {
  const file = fs.readFileSync(`${name}.txt`).toString().split("\n");
  return file.length > 1 && file[0] !== ""
    ? file.slice(0, file.length - 1).map((line) => JSON.parse(line))
    : [];
};

export const writeFile = async (name: Files, resp: any) => {
  await fs.appendFileSync(`${name}.txt`, JSON.stringify(resp) + "\n");
};
