import './sign-in-and-sign-up.styles.scss';
import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage: React.FC = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
    </div>
  );
};

export default SignInAndSignUpPage;
