import { memo } from "react";
import { Text, Pressable } from "react-native";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;
  return (
    <Pressable
      onPress={() => setSelectedRange(filterDay)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? "#1e1e1e"
          : "transparent",
      }}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "white" : "grey" }}>
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
