import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";

const StarRating = props => {
  var stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: "row" }}>
      {stars.map(n => (
        <Icon
          key={n}
          color="gold"
          name={n <= props.rating ? "star" : "star-border"}
        />
      ))}
    </View>
  );
};

export default StarRating;
