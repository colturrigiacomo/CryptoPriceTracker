import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getDetailedCoinApi = async (coinId) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  return response.data;
};

export const getCoinMarketChartApi = async (coinId, days = 1) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
  );
  return response.data;
};

export const getMarketDataApi = async (pageNumber = 1) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
  );
  return response.data;
};

export const getWatchlistedCoinsApi = async (pageNumber = 1, coinIds) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
  );
  return response.data;
};
