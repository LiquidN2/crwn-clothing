import React, { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '../../hooks';
import { AuthStatusType, selectUserStatus } from '../../redux/user';

import FormInput from '../form-input/form-input.component';
import { StyledCustomButton } from '../custom-button/custom-button.styles';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUpAsync, checkUserSessionAsync } = useActions();
  const navigate = useNavigate();
  const userStatus = useAppSelector(selectUserStatus);

  const disabledButton =
    userStatus === AuthStatusType.Authenticating ||
    userStatus === AuthStatusType.SigningUp;

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    try {
      const formData = {
        displayName: displayName.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };

      if (formData.password !== formData.confirmPassword) {
        throw Error('passwords do not match');
      }

      await signUpAsync({ email, password, displayName });
      await checkUserSessionAsync();
      navigate('/');
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
      <span>Sign up with your email & password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="display name"
          value={displayName}
          handleChange={e => setDisplayName(e.currentTarget.value)}
          type="text"
          name="name"
          id="name"
          required={true}
        />

        <FormInput
          label="email"
          value={email}
          handleChange={e => setEmail(e.currentTarget.value)}
          type="email"
          name="email"
          id="email"
          required={true}
        />

        <FormInput
          label="password"
          value={password}
          handleChange={e => setPassword(e.currentTarget.value)}
          type="password"
          id="password"
          name="password"
          required={true}
        />

        <FormInput
          label="confirm password"
          value={confirmPassword}
          handleChange={e => setConfirmPassword(e.currentTarget.value)}
          type="password"
          id="confirm-password"
          name="confirm-password"
          required={true}
        />

        <StyledCustomButton type="submit" disabled={disabledButton}>
          Sign Up
        </StyledCustomButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
