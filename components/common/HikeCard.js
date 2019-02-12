import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";

import StarRating from "./StarRating";

class HikeCard extends React.PureComponent {
  render() {
    const { id, snapshotURL, title, rating, date } = this.props.track;

    return (
      <Card
        key={id}
        image={{ uri: snapshotURL }}
        imageProps={{ resizeMode: "cover" }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
        <StarRating rating={rating} />
        <Text>{date}</Text>
      </Card>
    );
  }
}

export default HikeCard;
