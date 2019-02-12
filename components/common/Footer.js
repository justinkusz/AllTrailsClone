import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import FooterButton from "./FooterButton";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: null
    };
  }

  render() {
    const { container } = styles;

    return <View style={container}>{this.renderButtons()}</View>;
  }

  onPress = index => {
    this.setState(
      previousState => {
        return { selectedIndex: index };
      },
      () => {}
    );
  };

  isSelected(index) {
    return this.state.selectedIndex == index;
  }

  renderButtons = () => {
    return buttonProps.map(button => {
      let index = buttonProps.indexOf(button);
      let isSelected = this.isSelected(index);

      return (
        <TouchableHighlight
          key={index}
          underlayColor="white"
          onPress={() => this.onPress(index)}
        >
          <FooterButton
            icon={button.icon}
            iconType={button.iconType}
            text={button.text}
            selected={isSelected}
          />
        </TouchableHighlight>
      );
    });
  };
}

const buttonProps = [
  {
    icon: "search",
    iconType: "material",
    text: "Explore"
  },
  {
    icon: "heart",
    iconType: "evilicon",
    text: "Plan"
  },
  {
    icon: "fiber-manual-record",
    iconType: "material",
    text: "Record"
  },
  {
    icon: "history",
    iconType: "material",
    text: "History"
  },
  {
    icon: "person",
    iconType: "material",
    text: "Profile"
  }
];

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default Footer;
