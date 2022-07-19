import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CoinDetailedHeader from "../../components/CoinDetailedHeader";
import styles from "./styles";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinApi,
  getCoinMarketChartApi,
  getCandleChartDataApi,
} from "../../api/client";
import colors from "../../config/colors";
import FilterComponent from "../../components/FilterComponent/index";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";

const CoinDetailedScreen = () => {
  const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
  ];

  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [candleChartData, setCandleChartData] = useState(null);
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinApi(coinId);
    const fetchedCoinMarketData = await getCoinMarketChartApi(
      coinId,
      selectedRange
    );
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (range) => {
    const fetchedCoinMarketData = await getCoinMarketChartApi(coinId, range);
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleChartData = async (range) => {
    const fetchedChandleChartData = await getCandleChartDataApi(coinId, range);
    setCandleChartData(fetchedChandleChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleChartData(1);
  }, []);

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  if (loading || !coin || !coinMarketData || !candleChartData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? colors.red : colors.green || colors.white;

  const chartColor =
    current_price.usd > prices[0][1] ? colors.green : colors.red;

  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd.toFixed(6)}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }

    if (current_price.usd < 1) {
      return `$${parseFloat(value).toFixed(6)}`;
    }

    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  const onSelectedRangeChange = async (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleChartData(selectedRangeValue);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CoinDetailedHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <LineChart.PriceText
              format={formatCurrency}
              style={styles.currentPrice}
            />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filterDaysArray.map((day) => (
            <FilterComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
              key={day.filterText}
            />
          ))}

          {isCandleChartVisible ? (
            <MaterialIcons
              name="show-chart"
              size={24}
              color={colors.green}
              onPress={() => setIsCandleChartVisible(false)}
            />
          ) : (
            <Feather
              name="bar-chart-2"
              size={24}
              color={colors.green}
              onPress={() => setIsCandleChartVisible(true)}
            />
          )}
        </View>

        {isCandleChartVisible ? (
          <CandlestickChart.Provider
            data={candleChartData.map(
              ([timestamp, open, high, low, close]) => ({
                timestamp,
                open,
                high,
                low,
                close,
              })
            )}
          >
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
            <View style={styles.candleDataContainer}>
              <View>
                <Text style={styles.candleTextLabel}>Open</Text>
                <CandlestickChart.PriceText
                  style={styles.candleText}
                  type="open"
                />
              </View>
              <View>
                <Text style={styles.candleTextLabel}>High</Text>
                <CandlestickChart.PriceText
                  style={styles.candleText}
                  type="high"
                />
              </View>
              <View>
                <Text style={styles.candleTextLabel}>Low</Text>
                <CandlestickChart.PriceText
                  style={styles.candleText}
                  type="low"
                />
              </View>
              <View>
                <Text style={styles.candleTextLabel}>Close</Text>
                <CandlestickChart.PriceText
                  style={styles.candleText}
                  type="close"
                />
              </View>
            </View>
            <CandlestickChart.DatetimeText
              style={{ color: "white", fontWeight: "700", margin: 10 }}
            />
          </CandlestickChart.Provider>
        ) : (
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        )}

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;
