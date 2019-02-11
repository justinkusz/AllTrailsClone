import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import  { FormLabel, FormInput, FormValidationMessage, Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, checkAuthenticationStatus } from '../actions';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            error: null,
            email: null,
            password: null,
            user: null,
            loading: false
        };

    }

    componentWillMount() {
        this.props.checkAuthenticationStatus();
    }

    render() {
        return (
            <Card title={this.props.user ? 'Login Success!' : 'Log In'}>
                <FormLabel>Email</FormLabel>

                <FormInput
                    autoCapitalize='none'
                    autoFocus={true}
                    blurOnSubmit={false}
                    onChangeText={this.onChangeEmail}
                    onSubmitEditing={this.focusNextInput}
                    containerStyle={{borderBottomWidth: 1}} 
                    keyboardType='email-address'
                    returnKeyType='next'
                    textContentType='username' 
                    placeholder='user@email.com'
                    value={this.props.email}
                />

                <FormLabel>Password</FormLabel>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <FormInput
                        ref={(input) => this.secondTextInput = input}
                        onChangeText={this.onChangePassword}
                        containerStyle={{borderBottomWidth: 1, flex: 0.9}} 
                        secureTextEntry={!this.state.showPassword} 
                        textContentType='password'
                        value={this.props.password}
                    />
                    
                    <Icon onPress={this.toggleShowPassword} style={{flex: 0.1}} type='feather' name={this.state.showPassword ? 'eye-off' : 'eye'}></Icon>
                </View>

                <FormValidationMessage>{this.props.error}</FormValidationMessage>

                {this.props.loading ? this.renderActivityIndicator() : this.renderButton() }
            
            </Card>
        )
    }

    onChangeEmail = (text) => {
        // this.setState({
        //     email: text
        // });

        this.props.emailChanged(text);

    }

    onChangePassword = (text) => {
        this.props.passwordChanged(text);
    }

    focusNextInput = () => {
        this.secondTextInput.focus();
    }

    renderActivityIndicator = () => {
        return <ActivityIndicator size='large' color='green' animating={true}></ActivityIndicator>
    }

    renderButton = () => {
        return <Button title='Log In / Sign Up' backgroundColor='green' onPress={this.submitForm}/>
    }

    registerUser = () => {
        console.log('User ' + this.state.email + ' not found. Registering user...');
    }

    submitForm = () => {
        const { email, password } = this.props;

        // this.setState({ loading: true });

        this.props.loginUser({email, password});
    }

    toggleShowPassword = () => {
        this.setState(previousState => {
            return { showPassword: !previousState.showPassword }
        });
    }

    userAuthenticated = () => {
        console.log(this.state.email + ' loged in!');
    }

    validatePassword = (text) => {
        if (text.length < 6) {
            this.setState({
                errorMessage: errorMessages['length']
            });
        } else {
            this.setState({
                errorMessage: null,
                password: text
            });
        }
    }

}

const errorMessages = {
    length: 'Password must be at least 6 characters'
}

const mapStateToProps = (state) => {
    const { email, password, loading, user, error } = state.auth;

    return {
        email: email,
        password: password,
        loading: loading,
        user: user,
        error: error,
    };
}

export default connect(mapStateToProps, 
    { emailChanged, passwordChanged, loginUser, checkAuthenticationStatus })(LoginForm);