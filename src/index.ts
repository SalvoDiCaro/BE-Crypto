import express from "express";
import favorites from "./routes/favorites";
import users from "./routes/users";
import trading from "./routes/trading";
import cryptoRoute from "./routes/cryptos";
import cors from "cors";

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import axios from "axios";
import { RespCrypto } from "./models/RespCrypto";
import {
  cryptos,
  loadCryptos,
  loadTrading,
  loadUsers,
  writeFile,
} from "./resources/resources";

const serviceAccount = require("./configurations/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", cors() as any);

app.use("/favorites", favorites);
app.use("/users", users);
app.use("/trading", trading);
app.use("/cryptos", cryptoRoute);

loadCryptos();
loadTrading();
loadUsers();

setInterval(async () => {
  try {
    const { data: resp } = await axios.get<RespCrypto[]>(
      `https://api.nomics.com/v1/currencies/ticker`,
      {
        params: {
          page: 1,
          "per-page": 100,
          convert: "EUR",
          interval: "1d,30d",
          key: "4811c763647336363713823d25db32e630d90029",
        },
      }
    );

    const mappedResp = resp.map(
      ({
        high_timestamp,
        high,
        id,
        currency,
        price,
        price_date,
        price_timestamp,
        name,
        status,
        symbol,
        rank,
        ["1d"]: { price_change_pct },
        market_cap_dominance,
        market_cap,
        logo_url,
      }) => ({
        high_timestamp,
        high,
        id,
        price,
        price_timestamp,
        name,
        status,
        symbol,
        currency,
        price_date,
        rank,
        price_change_pct,
        market_cap_dominance,
        market_cap,
        logo_url,
      })
    );

    await writeFile("cryptos", mappedResp);

    cryptos.push(mappedResp);
  } catch (e) {
    console.log("e", e);
  }
}, 30000);

app.listen(port, () => console.log("Server is running"));

export default app;
