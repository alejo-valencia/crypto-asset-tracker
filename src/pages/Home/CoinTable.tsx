import React, { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { Button, Footer, LoadingOverlay } from "../../components";
import useCoinMarketData, { Coin } from "../../hooks/useMarketData";

interface SearchStore {
  searchString: string;
  setSearchString: (newSearchString: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchStore = create<SearchStore>((set) => ({
  searchString: "",
  setSearchString: (newSearchString) =>
    set(() => ({ searchString: newSearchString })),
}));

const CoinTable: React.FC = () => {
  const { data, loading, error } = useCoinMarketData();
  const { searchString } = useSearchStore();
  const searchDelta = useRef("");
  const [filteredItems, setFilteredItems] = useState<Coin[]>([]);

  useEffect(() => {
    if (
      filteredItems.length === 0 &&
      searchString === "" &&
      searchDelta.current === ""
    ) {
      setFilteredItems(data || []);
    }

    if (searchString !== searchDelta.current) {
      searchDelta.current = searchString;

      if (searchString === "") setFilteredItems(data || []);
      else {
        const filtered = data?.filter(
          (f) =>
            f.name
              .toLowerCase()
              .trim()
              .includes(searchString.toLowerCase().trim()) ||
            f.symbol
              .toLowerCase()
              .trim()
              .includes(searchString.toLowerCase().trim()),
        );
        setFilteredItems(filtered || []);
      }
    }
  }, [searchString, data, filteredItems.length]);

  if (loading) return <LoadingOverlay />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <div className="my-4 h-full w-full rounded bg-slate-100 p-2">
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clean Cache
        </Button>
      </div>
      <div className="overflow-x-auto rounded">
        <table className="min-w-full rounded text-left text-sm">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Coin</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">1h</th>
              <th className="px-4 py-2">24h</th>
              <th className="px-4 py-2">7d</th>
              <th className="px-4 py-2">24h Volume</th>
              <th className="px-4 py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredItems?.map((coin, index) => (
              <tr
                key={coin.id}
                className={index % 2 === 0 ? "bg-indigo-50" : ""}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="flex items-center px-4 py-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="mr-2 h-6 w-6"
                  />
                  <a className="underline" href={`/coin/${coin.id}`}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </a>
                </td>
                <td className="px-4 py-2">
                  ${coin.current_price.toLocaleString()}
                </td>

                <td
                  className={`px-4 py-2 ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {coin.price_change_percentage_1h_in_currency !== undefined
                    ? `${coin.price_change_percentage_1h_in_currency.toFixed(2)}%`
                    : "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${coin.price_change_percentage_24h_in_currency > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {coin.price_change_percentage_24h_in_currency !== undefined
                    ? `${coin.price_change_percentage_24h_in_currency.toFixed(2)}%`
                    : "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${coin.price_change_percentage_7d_in_currency > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {coin.price_change_percentage_7d_in_currency !== undefined
                    ? `${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`
                    : "N/A"}
                </td>

                <td className="px-4 py-2">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default CoinTable;
