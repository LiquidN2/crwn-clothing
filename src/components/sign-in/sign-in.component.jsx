import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import FormInput from 'components/form-input/form-input.component';
import CustumButton from 'components/custom-button/custom-button.component';

// REDUX ACTIONS
import { googleSignInStart, emailSignInStart } from 'redux/user/user.actions';

// STYLES
import { SignInContainer, Title, ButtonsContainer } from './sign-in.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    setUserCredentials(userCredentials => ({
      ...userCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart({ email, password });
  };

  return (
    <SignInContainer>
      <Title>I have an account</Title>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          id="email-sign-in"
          name="email"
          value={email}
          onChange={handleInputChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          id="password-sign-in"
          name="password"
          value={password}
          onChange={handleInputChange}
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
};

SignIn.propTypes = {
  googleSignInStart: PropTypes.func,
  emailSignInStart: PropTypes.func,
};

const mapDispatchToProps = {
  googleSignInStart,
  emailSignInStart,
};

export default connect(null, mapDispatchToProps)(SignIn);
