import React, { FormEventHandler, MouseEventHandler, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import { StyledCustomButton } from '../custom-button/custom-button.styles';

import { ButtonGroup, SignInContainer, SignInTitle } from './sign-in.styles';

import { useActions, useAppSelector } from '../../hooks';
import { AuthStatusType, selectUserStatus } from '../../redux/user';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInAsync, signInWithGoogleAsync } = useActions();
  const userStatus = useAppSelector(selectUserStatus);
  const disabledButton =
    userStatus === AuthStatusType.Authenticating ||
    userStatus === AuthStatusType.SigningUp;

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    const formData = {
      email: email.trim(),
      password: password.trim(),
    };

    signInAsync(formData);
  };

  const handleSignInWithGoogleClick: MouseEventHandler<HTMLButtonElement> =
    async () => {
      try {
        await signInWithGoogleAsync();
      } catch (err: any) {
        console.error('Error code:', err.code);
      }
    };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email & password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label="email"
          value={email}
          handleChange={e => setEmail(e.currentTarget.value)}
          type="email"
          id="signin-email"
          name="signin-email"
          required={true}
        />

        <FormInput
          label="password"
          value={password}
          handleChange={e => setPassword(e.currentTarget.value)}
          type="password"
          id="signin-password"
          name="signin-password"
          required={true}
        />

        <ButtonGroup>
          <StyledCustomButton type="submit" disabled={disabledButton}>
            Sign In
          </StyledCustomButton>
          <StyledCustomButton
            type="button"
            isGoogleSignIn={true}
            onClick={handleSignInWithGoogleClick}
            disabled={disabledButton}
          >
            Sign In with Google
          </StyledCustomButton>
        </ButtonGroup>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
