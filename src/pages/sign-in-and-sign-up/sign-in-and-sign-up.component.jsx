import React from 'react';

// CHILD COMPONENTS
import SignIn from 'components/sign-in/sign-in.component';
import SignUp from 'components/sign-up/sign-up.component';

// STYLES
import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
