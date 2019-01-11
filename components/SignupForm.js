import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import  { FormLabel, FormInput, FormValidationMessage, Card, Button, Avatar, Text } from 'react-native-elements';
import { connect } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';

import { pickedProfilePhoto,
    changedFirstName,
    changedLastName,
    changedDisplayName,
    updatedProfile } from '../actions';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Card title='Welcome'>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
                    {this.renderAvatar()}
                    <Button title={this.props.profilePhoto ? 'Change profile picture' : 'Upload profile picture'} onPress={this.choosePicture}></Button>
                </View>

                <FormLabel>First</FormLabel>

                <FormInput 
                    autoCapitalize='words'
                    autoFocus={true}
                    blurOnSubmit={false}
                    containerStyle={{borderBottomWidth: 1}}
                    returnKeyType='next'
                    value={this.props.firstName}
                    onChangeText={this.onChangeFirstName}
                    onSubmitEditing={this.focusNextInput}
                />

                <FormLabel>Last</FormLabel>

                <FormInput 
                    ref={(input) => this.secondTextInput = input}
                    autoCapitalize='words'
                    blurOnSubmit={false}
                    containerStyle={{borderBottomWidth: 1}} 
                    returnKeyType='next'
                    value={this.props.lastName}
                    onChangeText={this.onChangeLastName}
                    blurOnSubmit={true}
                />

                <FormValidationMessage>{this.props.error}</FormValidationMessage>

                <Button onPress={this.submitForm} title='Finish' backgroundColor='green'></Button>

            </Card>
        );
    }

    onChangeFirstName = (text) => {
        this.props.changedFirstName(text);
    }

    onChangeLastName = (text) => {
        this.props.changedLastName(text);
    }

    submitForm = () => {
        const displayName = this.props.firstName + ' ' + this.props.lastName;
        this.props.updatedProfile({
            profilePhotoURL: this.props.profilePhotoURL, 
            displayName: displayName});
    };

    // choosePicture = () => {
    //     const options = {
    //         title: 'Select Profile Picture'
    //     };

    //     ImagePicker.showImagePicker(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('Image picker cancelled.');
    //         } else if (response.error) {
    //             console.log('Image picker error: ' + response.error);
    //         } else {
    //             this.props.pickedProfilePhoto(response.uri, response.data);
    //         }
    //     });
    // }

    choosePicture = () => {
        ImagePicker.launchImageLibraryAsync({base64: true}).then((result) => {
            this.props.pickedProfilePhoto(result.uri, result.base64)
        });
    }

    renderAvatar = () => {
        if (this.props.profilePhoto) {
            return <Avatar medium rounded source={{uri: this.props.profilePhoto}}></Avatar>
        } else {
            return <Avatar medium rounded icon={{name: 'person'}}></Avatar>
        }
    }

    focusNextInput = () => {
        this.secondTextInput.focus();
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { profilePhoto,
        profilePhotoURL,
        firstName,
        lastName,
        displayName } = state.profile;

    return {
        user: user,
        profilePhoto: profilePhoto,
        profilePhotoURL: profilePhotoURL,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName
    }
}

export default connect(mapStateToProps,
    {
        pickedProfilePhoto,
        changedFirstName,
        changedLastName,
        changedDisplayName,
        updatedProfile
    }
    )(SignupForm);