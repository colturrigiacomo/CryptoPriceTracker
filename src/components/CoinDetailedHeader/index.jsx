import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import {
  useWatchlist,
  storeWatchlistCoinId,
  removeWatchlistCoinId,
} from "../../context/WatchlistContext";

const CoinDetailedHeader = (props) => {
  const navigation = useNavigation();

  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchlist();

  const { coinId, image, symbol, marketCapRank } = props;

  const isCoinWatchlisted = () => {
    return watchlistCoinIds.some((coindIdValue) => coindIdValue === coinId);
  };

  const handleWatchlistCoin = () => {
    if (isCoinWatchlisted()) {
      return removeWatchlistCoinId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={isCoinWatchlisted() ? "star" : "star-o"}
        size={25}
        color={isCoinWatchlisted() ? "#FFBF00" : "white"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;
