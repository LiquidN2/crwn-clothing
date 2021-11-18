import './sign-in.styles.scss';
import React, { FormEventHandler, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle, signIn } from '../../firebase/firebase.auth';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    const formData = {
      email: email.trim(),
      password: password.trim(),
    };

    signIn(formData).then();
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
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
