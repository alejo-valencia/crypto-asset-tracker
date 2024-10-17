import React, { useState } from "react";
import {
  Footer,
  LoadingOverlay,
  NavBar,
  ResponsiveBlocker,
} from "../../components";
import roundToNearestHour from "../../helpers/round";
import useCoinMarketData from "../../hooks/useMarketData";
import HistoricChart from "../Coin/HistoricChart";

let nowDate = new Date();
nowDate = roundToNearestHour(nowDate);
const now = Math.floor(nowDate.getTime() / 1000);

const oneDayAgo = now - 24 * 60 * 60;
const oneWeekAgo = now - 7 * 24 * 60 * 60;
const oneMonthAgo = now - 30 * 24 * 60 * 60;
const oneYearAgo = now - 365 * 24 * 60 * 60;

export default function Compare() {
  const { data: coins, loading, error } = useCoinMarketData();
  const [coin1, setCoin1] = useState<string | null>(null);
  const [coin2, setCoin2] = useState<string | null>(null);

  const handleSelectCoin1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin1(e.target.value);
  };

  const handleSelectCoin2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin2(e.target.value);
  };

  if (loading) return <LoadingOverlay />;
  if (error) return <p>Error loading coins.</p>;

  return (
    <main className="min-h-screen">
      <ResponsiveBlocker />
      <NavBar />
      <div className="m-8 flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Compare Coins</h1>
        <div className="mb-8 flex space-x-4">
          <select
            value={coin1 || ""}
            onChange={handleSelectCoin1}
            className="rounded border border-gray-300 p-2"
          >
            <option value="" disabled>
              Select First Coin
            </option>
            {coins &&
              coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
          </select>
          <p>➡️</p>
          <select
            value={coin2 || ""}
            onChange={handleSelectCoin2}
            className="rounded border border-gray-300 p-2"
          >
            <option value="" disabled>
              Select Second Coin
            </option>
            {coins &&
              coins
                .filter((coin) => coin.id !== coin1)
                .map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
          </select>
        </div>

        {coin1 && coin2 && (
          <>
            <HistoricChart
              coinId1={coin1}
              coinId2={coin2}
              from={oneDayAgo}
              to={now}
              title="24h Comparison"
            />
            <HistoricChart
              coinId1={coin1}
              coinId2={coin2}
              from={oneWeekAgo}
              to={now}
              title="7 Days Comparison"
            />
            <HistoricChart
              coinId1={coin1}
              coinId2={coin2}
              from={oneWeekAgo}
              to={now}
              title="1 Week Comparison"
            />
            <HistoricChart
              coinId1={coin1}
              coinId2={coin2}
              from={oneMonthAgo}
              to={now}
              title="1 Month Comparison"
            />
            <HistoricChart
              coinId1={coin1}
              coinId2={coin2}
              from={oneYearAgo}
              to={now}
              title="1 Year Comparison"
            />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
