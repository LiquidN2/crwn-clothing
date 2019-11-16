import React from 'react';

// CHILD COMPONENTS
import SignIn from 'components/sign-in/sign-in.component';
import SignUp from 'components/sign-up/sign-up.component';

// STYLES
import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => {
  return (
    <SignInAndSignUpContainer>
      <SignIn />
      <SignUp />
    </SignInAndSignUpContainer>
  );
};

export default SignInAndSignUpPage;
