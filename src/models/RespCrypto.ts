export interface d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
}

export interface d3 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
}

export interface RespCrypto {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  status: string;
  platform_currency: string;
  price: string;
  price_date: Date;
  price_timestamp: Date;
  circulating_supply: string;
  market_cap: string;
  market_cap_dominance: string;
  num_exchanges: string;
  num_pairs: string;
  num_pairs_unmapped: string;
  first_candle: Date;
  first_trade: Date;
  first_order_book: Date;
  rank: string;
  rank_delta: string;
  high: string;
  high_timestamp: Date;
  "1d": d2;
  "30d": d3;
  max_supply: string;
  first_priced_at?: Date;
}

export interface MappedCrypto {
  high_timestamp: Date;
  high: string;
  id: string;
  price: string;
  price_timestamp: Date;
  name: string;
  status: string;
  symbol: string;
  currency: string;
  price_date: Date;
  rank: string;
  price_change_pct: string;
  market_cap_dominance: string;
  market_cap: string;
}
