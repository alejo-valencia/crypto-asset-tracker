import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoadingOverlay } from "../../components";
import useCoinMarketRange from "../../hooks/useCoinMarketRange";

interface CoinHistoricalChartProps {
  coinId1: string;
  from: number;
  to: number;
  title: string;
  coinId2?: string;
}

const HistoricChart: React.FC<CoinHistoricalChartProps> = ({
  coinId1,
  coinId2,
  from,
  to,
  title,
}) => {
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useCoinMarketRange(coinId1, from, to);

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useCoinMarketRange(coinId2 || null, from, to);

  const [chartData, setChartData] = useState<
    { date: string; price1: number; price2?: number }[]
  >([]);

  useEffect(() => {
    if (data1) {
      const formattedData = data1.prices.map(
        (price1: [number, number], index: number) => {
          const price2 = data2?.prices?.[index]?.[1] || undefined;
          return {
            date: format(new Date(price1[0]), "MMM dd"),
            price1: price1[1],
            price2: price2,
          };
        },
      );
      setChartData(formattedData);
    }
  }, [data1, data2]);

  if (loading1 || loading2) return <LoadingOverlay />;
  if (error1 || error2) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-center text-xl font-semibold">
        {title}
        <br />
        <small>
          Data from {format(new Date(from * 1000), "MMM dd, yyyy")} to{" "}
          {format(new Date(to * 1000), "MMM dd, yyyy")}
        </small>
      </h2>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval={Math.ceil(chartData.length / 10)}
            tickFormatter={(value, index) =>
              index === 0 || value !== chartData[index - 1].date ? value : ""
            }
          />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value: number) => (
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)}{" "}
                USD
              </span>
            )}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
            labelStyle={{
              fontWeight: "bold",
            }}
          />
          <Line
            type="monotone"
            dataKey="price1"
            stroke="#6366F1"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            name="Coin 1"
          />
          {coinId2 && (
            <Line
              type="monotone"
              dataKey="price2"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={false}
              activeDot={false}
              name="Coin 2"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricChart;
