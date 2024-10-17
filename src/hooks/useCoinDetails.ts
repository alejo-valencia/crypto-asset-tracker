import useGeckoAPI from "./useGeckoAPI";

interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: { thumb: string; small: string; large: string };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_1h_in_currency: {
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_7d_in_currency: {
      usd: number;
    };
  };
}

const useCoinDetails = (coinId: string) => {
  const endpoint = `/coins/${coinId}`;
  const { data, loading, error } = useGeckoAPI<CoinDetails>(endpoint);

  return { data, loading, error };
};

export default useCoinDetails;
