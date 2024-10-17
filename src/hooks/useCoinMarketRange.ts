import useGeckoAPI from "./useGeckoAPI";

interface CoinMarketRange {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const useCoinMarketRange = (
  coinId: string | null,
  from: number,
  to: number,
) => {
  if (coinId === null) return { data: null, loading: false, error: false };

  const endpoint = `/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;

  // @TODO Fix this line to prevent re-calling a hook
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useGeckoAPI<CoinMarketRange>(endpoint);
  return { data, loading, error };
};

export default useCoinMarketRange;
