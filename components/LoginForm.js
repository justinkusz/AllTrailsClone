import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Card,
  Icon,
  Button
} from "react-native-elements";
import { connect } from "react-redux";

import { loginUser, checkAuthenticationStatus } from "../actions";

const isEmail = require("validator/lib/isEmail");

class LoginForm extends Component {
  constructor(props) {
    super(props);

    let creds = {};
    if (__DEV__) {
      creds = require("../loginCreds.json");
    }

    this.state = {
      showPassword: false,
      errorEmail: null,
      errorPassword: null,
      error: null,
      email: creds.email || "",
      password: creds.password || "",
      user: null,
      loading: false
    };
  }

  componentWillMount() {
    this.props.checkAuthenticationStatus();
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          {this.renderActivityIndicator()}
        </View>
      );
    }

    return (
      <Card title={this.props.user ? "Login Success!" : "Log In"}>
        <FormLabel>Email</FormLabel>
        <FormInput
          autoCapitalize="none"
          autoFocus={true}
          blurOnSubmit={false}
          onChangeText={this.onChangeEmail}
          onSubmitEditing={this.validateEmail}
          containerStyle={{ borderBottomWidth: 1 }}
          keyboardType="email-address"
          returnKeyType="next"
          textContentType="username"
          placeholder="user@email.com"
          value={this.state.email}
        />
        <FormValidationMessage>{this.state.errorEmail}</FormValidationMessage>

        <FormLabel>Password</FormLabel>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FormInput
            autoCapitalize="none"
            ref={input => (this.passwordInput = input)}
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.validatePassword}
            containerStyle={{ borderBottomWidth: 1, flex: 0.9 }}
            secureTextEntry={!this.state.showPassword}
            textContentType="password"
            value={this.state.password}
          />

          <Icon
            onPress={this.toggleShowPassword}
            style={{ flex: 0.1 }}
            type="feather"
            name={this.state.showPassword ? "eye-off" : "eye"}
          />
        </View>
        <FormValidationMessage>
          {this.state.errorPassword}
        </FormValidationMessage>

        <FormValidationMessage>{this.props.error}</FormValidationMessage>

        {this.props.loading
          ? this.renderActivityIndicator()
          : this.renderButton()}
      </Card>
    );
  }

  onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  renderActivityIndicator = () => {
    return <ActivityIndicator size="large" color="green" animating={true} />;
  };

  renderButton = () => {
    return (
      <Button
        disabled={!this.emailValid() || !this.passwordValid()}
        title="Log In / Sign Up"
        backgroundColor="green"
        onPress={this.submitForm}
      />
    );
  };

  registerUser = () => {
    console.log("User " + this.state.email + " not found. Registering user...");
  };

  submitForm = () => {
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
  };

  toggleShowPassword = () => {
    this.setState(previousState => {
      return { showPassword: !previousState.showPassword };
    });
  };

  userAuthenticated = () => {
    console.log(this.state.email + " loged in!");
  };

  emailValid = () => {
    return isEmail(this.state.email);
  };

  passwordValid = () => {
    return this.state.password.length > 6;
  };

  validateEmail = () => {
    if (this.emailValid()) {
      this.setState(
        {
          errorEmail: null
        },
        () => {
          this.passwordInput.focus();
        }
      );
    } else {
      this.setState({
        errorEmail: "Invalid email address"
      });
    }
  };

  validatePassword = () => {
    if (this.passwordValid()) {
      this.setState(
        {
          errorPassword: null
        },
        () => {
          return true;
        }
      );
    } else {
      this.setState({
        errorPassword: "Password must be at least 6 characters"
      });
    }
  };
}

const mapStateToProps = state => {
  const { loading, user, error } = state.auth;

  return {
    loading: loading,
    user: user,
    error: error
  };
};

export default connect(
  mapStateToProps,
  { loginUser, checkAuthenticationStatus }
)(LoginForm);
