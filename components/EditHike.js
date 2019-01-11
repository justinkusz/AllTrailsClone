import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Rating, FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ratedRecording,
    savedRecording,
    recordingTitleChanged,
    recordingDescriptionChanged,
    uploadTrackSnapshot } from '../actions';

class EditHike extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Card>
                    <Rating 
                        type='star'
                        fractions={0}
                        startingValue={0}
                        onFinishRating={this.onRatedRecording}
                    />
                    <FormLabel>Title</FormLabel>
                    <FormInput
                        onChangeText={this.onChangeTitle}
                        containerStyle={styles.input}>
                        {this.props.title}
                    </FormInput>
                    <FormLabel>Description</FormLabel>
                    <FormInput
                        onChangeText={this.onChangeDescription}
                        containerStyle={styles.input}>
                        {this.props.description}
                    </FormInput>
                    <Button
                        title='Save'
                        onPress={this.onSaveRecording}
                    />
                </Card>
            </View>
        );
    };

    onChangeTitle = (title) => {
        this.props.recordingTitleChanged(title);
    };
    
    onChangeDescription = (description) => {
        this.props.recordingDescriptionChanged(description);
    };
    
    onSaveRecording = () => {
        const {
            locations, 
            title, 
            description, 
            rating,
            snapshot
        } = this.props;

        this.props.savedRecording(locations, rating, title, description, snapshot);

        Actions.reset('home');
    }
    
    onRatedRecording = (rating) => {
        console.log('User rated track: ' + rating);
        this.props.ratedRecording(rating);
    };
};

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        marginBottom: 10
    }
});

const mapStateToProps = (state) => {
    const { 
        locations,
        title, 
        description, 
        rating,
        snapshot
    } = state.recorder;

    return {
        locations: locations,
        title: title,
        description: description,
        rating: rating,
        snapshot: snapshot
    };
};

export default connect(
    mapStateToProps, 
    {
        ratedRecording, 
        savedRecording,
        recordingTitleChanged,
        recordingDescriptionChanged,
        uploadTrackSnapshot
    }
    ) (EditHike);