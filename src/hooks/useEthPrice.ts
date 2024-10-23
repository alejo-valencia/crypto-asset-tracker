import useGeckoAPI from "./useGeckoAPI";

interface EthPriceResponse {
  ethereum: {
    usd: number;
  };
}

const useEthPrice = () => {
  const { data, loading, error } = useGeckoAPI<EthPriceResponse>(
    "/simple/price?ids=ethereum&vs_currencies=usd",
  );

  const price = data ? data.ethereum.usd : null;
  return { price, loading, error };
};

export default useEthPrice;
