import React from "react";
import { LoadingOverlay } from "../../components";
import useCoinDetails from "../../hooks/useCoinDetails";

interface CoinHeaderProps {
  coinId: string;
}

const CoinHeader: React.FC<CoinHeaderProps> = ({ coinId }) => {
  const { data, loading, error } = useCoinDetails(coinId);

  if (loading) return <LoadingOverlay />;
  if (error) return <p>Error loading coin data</p>;
  if (!data) return null;

  const { name, symbol, image, market_data } = data;
  const currentPrice = market_data.current_price.usd;
  const marketCap = market_data.market_cap.usd;
  const change1h = market_data.price_change_percentage_1h_in_currency.usd;
  const change24h = market_data.price_change_percentage_24h_in_currency.usd;
  const change7d = market_data.price_change_percentage_7d_in_currency.usd;

  return (
    <div className="m-8 flex items-center rounded-lg bg-white p-4 shadow-md">
      <img src={image.large} alt={name} className="mr-8 h-16 w-16" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          {name} ({symbol.toUpperCase()})
        </h1>

        <div className="mt-2 flex flex-col text-lg font-semibold">
          <span className="mr-4">
            Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(currentPrice)}
          </span>
          <small>
            Market Cap:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(marketCap)}
          </small>
        </div>

        <div className="mt-2 flex space-x-4 text-sm">
          <span
            className={`mr-4 ${change1h >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            1h: {change1h.toFixed(2)}%
          </span>
          <span
            className={`mr-4 ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            24h: {change24h.toFixed(2)}%
          </span>
          <span
            className={`mr-4 ${change7d >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            7d: {change7d.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinHeader;
