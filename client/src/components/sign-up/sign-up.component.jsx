import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import FormInput from 'components/form-input/form-input.component';
import CustumButton from 'components/custom-button/custom-button.component';

// REDUX ACTIONS
import { signUpStart } from 'redux/user/user.actions';

// STYLES
import { SignUpContainer, Title, ButtonsContainer } from './sign-up.styles';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { displayName, email, password, passwordConfirm } = userCredentials;

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
    if (password !== passwordConfirm) {
      return alert("Passwords don't match");
    }

    signUpStart({ email, password, displayName });
  };

  return (
    <SignUpContainer>
      <Title>I do not have an account</Title>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          id="displayName-sign-up"
          name="displayName"
          value={displayName}
          onChange={handleInputChange}
          label="Display Name"
          required
        />

        <FormInput
          type="email"
          id="email-sign-up"
          name="email"
          value={email}
          onChange={handleInputChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          id="password-sign-up"
          name="password"
          value={password}
          onChange={handleInputChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          id="password-confirm-sign-up"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleInputChange}
          label="Confirm Password"
          required
        />
        <ButtonsContainer>
          <CustumButton type="submit">Sign In</CustumButton>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

SignUp.propTypes = {
  signUpStart: PropTypes.func,
};

const mapDispatchToProps = {
  signUpStart,
};

export default connect(null, mapDispatchToProps)(SignUp);
