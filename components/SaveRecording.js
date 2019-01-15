import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Card, Rating, FormLabel, FormInput, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { saveRecording, updateLifetimeStats } from '../lib/Recording';
import { hikeAdded, statsChanged } from '../actions';

class SaveRecording extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      title: "",
      description: "",
      loading: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Rating
            readonly={this.state.loading}
            showRating
            type="star"
            fractions={0}
            startingValue={this.state.rating}
            onFinishRating={this.onChangeRating}
          />
          <FormLabel>Title</FormLabel>
          <FormInput
            editable={!this.state.loading}
            onChangeText={this.onChangeTitle}
            containerStyle={styles.input}
          >
            {this.state.title}
          </FormInput>
          <FormLabel>Description</FormLabel>
          <FormInput
            editable={!this.state.loading}
            onChangeText={this.onChangeDescription}
            containerStyle={styles.input}
          >
            {this.state.description}
          </FormInput>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {this.state.loading ? this.renderLoading() : this.renderSaveButton()}
          </View>
        </Card>
      </View>
    );
  }

  renderLoading = () => {
    return <ActivityIndicator size="large" color="green"/>
  }

  renderSaveButton = () => {
    return (
      <Button
        backgroundColor="green"
        title="Save"
        onPress={this.onSaveRecording}
      />
    )
  }

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
    const { locations, snapshot } = this.props.recording;
    const { rating, title, description } = this.state;

    const recording = {
      locations,
      rating,
      title,
      description,
      snapshot
    };

    this.setState({loading: true});

    saveRecording(recording).then((track) => {
      this.props.hikeAdded(track);
      updateLifetimeStats(track.stats).then((stats) => {
        this.props.statsChanged(stats);
      }).then(() => {
        Actions.reset("home");
        Actions.jump("myHikes");
      })
    });
  };
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default connect(undefined, {hikeAdded, statsChanged})(SaveRecording);
