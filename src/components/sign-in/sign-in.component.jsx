import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// FIREBASE AUTH
import { auth, handleFirebaseSignInError } from 'firebase/firebase.utils';

// CHILD COMPONENTS
import FormInput from 'components/form-input/form-input.component';
import CustumButton from 'components/custom-button/custom-button.component';

// REDUX ACTIONS
import { googleSignInStart, emailSignInStart } from 'redux/user/user.actions';

// STYLES
import { SignInContainer, Title, ButtonsContainer } from './sign-in.styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    try {
      // await auth.signInWithEmailAndPassword(email, password);
      emailSignInStart({ email, password });
      this.setState({ email: '', password: '' });
    } catch (error) {
      handleFirebaseSignInError(error);
    }
  };

  render() {
    const { email, password } = this.state;
    const { googleSignInStart } = this.props;

    return (
      <SignInContainer>
        <Title>I have an account</Title>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            id="email-sign-in"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            id="password-sign-in"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            label="Password"
            required
          />
          <ButtonsContainer>
            <CustumButton type="submit">Sign In</CustumButton>
            <CustumButton
              type="button"
              isGoogleSignedIn
              onClick={googleSignInStart}
            >
              Sign In With Google
            </CustumButton>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}

SignIn.propTypes = {
  googleSignInStart: PropTypes.func,
  emailSignInStart: PropTypes.func,
};

const mapDispatchToProps = {
  googleSignInStart,
  emailSignInStart,
};

export default connect(null, mapDispatchToProps)(SignIn);
