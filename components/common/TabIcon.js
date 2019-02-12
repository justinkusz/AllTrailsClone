import React from "react";
import { Icon } from "react-native-elements";

const TabIcon = props => {
  return (
    <Icon
      name={props.iconName}
      color={props.focused ? "green" : "black"}
      containerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    />
  );
};

export default TabIcon;
