import useGeckoAPI from "./useGeckoAPI";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

const useCoinMarketData = () => {
  const endpoint =
    "/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&precision=2";

  const { data, loading, error } = useGeckoAPI<Coin[]>(endpoint);
  return { data, loading, error };
};

export default useCoinMarketData;
