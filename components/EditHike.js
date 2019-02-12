import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Rating,
  FormLabel,
  FormInput,
  Button
} from "react-native-elements";

import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { hikeUpdated, hikeRemoved } from "../actions";

class EditHike extends React.Component {
  constructor(props) {
    super(props);
    const { rating, title, description } = this.props.track;
    this.state = { rating, title, description };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Rating
            showRating
            type="star"
            fractions={0}
            startingValue={this.state.rating}
            onFinishRating={this.onChangeRating}
          />
          <FormLabel>Title</FormLabel>
          <FormInput
            onChangeText={this.onChangeTitle}
            containerStyle={styles.input}
          >
            {this.state.title}
          </FormInput>
          <FormLabel>Description</FormLabel>
          <FormInput
            onChangeText={this.onChangeDescription}
            containerStyle={styles.input}
          >
            {this.state.description}
          </FormInput>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              backgroundColor="green"
              title="Save"
              onPress={this.onSaveRecording}
            />
            {this.renderDeleteButton()}
          </View>
        </Card>
      </View>
    );
  }

  onRemoveHike = () => {
    const { track } = this.props;

    this.props.hikeRemoved(track).then(() => {
      Actions.reset("home");
      Actions.jump("myHikes");
    });
  };

  renderDeleteButton = () => {
    return (
      <Button
        backgroundColor="red"
        title="Delete"
        onPress={this.onRemoveHike}
      />
    );
  };

  onChangeTitle = title => {
    this.setState({ title });
  };

  onChangeDescription = description => {
    this.setState({ description });
  };

  onChangeRating = rating => {
    this.setState({ rating });
  };

  onSaveRecording = () => {
    const { rating, title, description } = this.state;
    const track = { ...this.props.track, rating, title, description };

    this.props.hikeUpdated(track).then(() => {
      Actions.reset("home");
      Actions.jump("myHikes");
    });
  };
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return { track: state.scene.track };
};

export default connect(
  mapStateToProps,
  { hikeUpdated, hikeRemoved }
)(EditHike);
