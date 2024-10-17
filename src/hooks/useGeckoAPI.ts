import { useEffect, useState } from "react";
import roundToNearestHour from "../helpers/round";

const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_GECKO_API_KEY;

const defaultCache = 1000 * 60 * 60 * 24;

const useGeckoAPI = <T>(
  endpoint: string,
  cacheDuration: number = defaultCache,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cacheKey = encodeURIComponent(endpoint);
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          const { timestamp, data: cachedResponse } = parsedCache;

          let now = new Date();
          now = roundToNearestHour(now);

          if (now.getTime() - timestamp < cacheDuration) {
            setData(cachedResponse);
            setLoading(false);
            return;
          }
        }

        const separator = endpoint.includes("?") ? "&" : "?";
        const url = `${BASE_URL}${endpoint}${separator}x_cg_demo_api_key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();

        let now = new Date();
        now = roundToNearestHour(now);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: now.getTime(),
            data: apiData,
          }),
        );

        setData(apiData);
      } catch (err) {
        console.log("ERROR", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, cacheDuration]);

  return { data, loading, error };
};

export default useGeckoAPI;
