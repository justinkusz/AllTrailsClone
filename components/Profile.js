import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-elements";
import { connect } from "react-redux";

import { msToTimeString } from "../lib/Conversions";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStatsCard = () => {
    const hikes = this.props.userStats.hikes;
    const distance =
      Number.parseFloat(this.props.userStats.distance).toPrecision(2) + " km";
    const elevation = Number.parseInt(this.props.userStats.elevation) + " m";
    const time = msToTimeString(this.props.userStats.time);

    return (
      <Card title="Lifetime Stats">
        <View>
          <Text>
            Total number of hikes: <Text>{hikes}</Text>
          </Text>
          <Text>
            Total distance: <Text>{distance}</Text>
          </Text>
          <Text>
            Total elevation gain: <Text>{elevation}</Text>
          </Text>
          <Text>
            Total time: <Text>{time}</Text>
          </Text>
        </View>
      </Card>
    );
  };

  renderUserInfoCard = () => {
    return (
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Avatar large source={{ uri: this.props.profilePhotoURL }} />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={{ fontSize: 24, paddingLeft: 10 }}>
              {this.props.displayName}
            </Text>
            <Text style={{ paddingLeft: 10 }}>{this.props.email}</Text>
            <Text style={{ paddingLeft: 10 }}>
              User since: {this.props.userSince}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  render() {
    return (
      <View>
        {this.renderUserInfoCard()}
        {this.renderStatsCard()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const profilePhotoURL = user.photoURL;
  const displayName = user.displayName;
  const email = user.email;
  const createDate = new Date(Date.parse(user.metadata.creationTime));

  const userSince = createDate.toLocaleDateString();
  const userStats = state.profile.stats;

  return {
    profilePhotoURL: profilePhotoURL,
    displayName: displayName,
    email: email,
    userSince: userSince,
    userStats: userStats
  };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default connect(mapStateToProps)(Profile);
