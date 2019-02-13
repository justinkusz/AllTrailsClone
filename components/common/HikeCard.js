import React from "react";
import { Text, ImageBackground } from "react-native";

import StarRating from "./StarRating";

class HikeCard extends React.Component {
  render() {
    const { snapshotURL, title, rating } = this.props.track;
    const date = this.props.track.stats.date;

    return (
      <ImageBackground
        source={{ uri: snapshotURL }}
        style={{ width: "100%", height: 150 }}
        resizeMode="cover"
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          {title}
        </Text>
        <StarRating rating={rating} />
        <Text style={{ color: "white", fontSize: 12 }}>{date}</Text>
      </ImageBackground>
    );
  }
}

export default HikeCard;
