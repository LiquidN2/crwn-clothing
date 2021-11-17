import './sign-in.styles.scss';
import React, { FormEventHandler, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label="email"
          handleChange={e => setEmail(e.currentTarget.value)}
          type="email"
          id="email"
          name="email"
          required={true}
        />

        <FormInput
          label="password"
          handleChange={e => setPassword(e.currentTarget.value)}
          type="password"
          id="password"
          name="password"
          required={true}
        />

        <div className="button-group">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn={true}
            handleClick={() => signInWithGoogle()}
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
