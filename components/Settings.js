import React from "react";
import { View, Text } from "react-native";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings will go here</Text>
      </View>
    );
  }
}

export default Settings;
