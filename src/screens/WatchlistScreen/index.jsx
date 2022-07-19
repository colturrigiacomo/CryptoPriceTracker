import { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useWatchlist } from "../../context/WatchlistContext";
import { getWatchlistedCoinsApi } from "../../api/client";
import CoinItem from "../../components/CoinItem/index";

export default WatchlistScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { watchlistCoinIds } = useWatchlist();

  const trasformCoinIds = () => {
    return watchlistCoinIds.join("%2C");
  };

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await getWatchlistedCoinsApi(1, trasformCoinIds());
    setCoins(result);
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null}
        />
      }
    />
  );
};
