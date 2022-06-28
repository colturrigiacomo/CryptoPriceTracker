import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getDetailedCoinApi = async (coinId) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  return response.data;
};

export const getCoinMarketChartApi = async (coinId) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`
  );
  return response.data;
};
