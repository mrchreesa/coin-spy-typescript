export interface Trending {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: boolean;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export interface Responsive1 {
  0: {
    items: number;
  };
  512: {
    items: number;
  };
}

export interface Coin {
  additional_notices: [];
  asset_platform_id: boolean;
  block_time_in_minutes: number;
  categories: [];
  coingecko_rank: number;
  coingecko_score: number;
  community_data: {};
  community_score: number;
  country_origin: string;
  description: { en: any };
  detail_platforms: {};
  developer_data: {};
  developer_score: number;
  genesis_date: string;
  hashing_algorithm: string;
  id: string;
  image: { large: string; small: string; thumb: string };
  last_updated: string;
  links: {};
  liquidity_score: number;
  localization: {};
  market_cap_rank: number;
  market_data: any;
  name: string;
  platforms: {};
  public_interest_score: number;
  public_interest_stats: { alexa_rank: number; bing_matches: boolean };
  public_notice: boolean;
  sentiment_votes_down_percentage: number;
  sentiment_votes_up_percentage: number;
  status_updates: [];
  symbol: string;
  tickers: [];
}

export interface User {}
