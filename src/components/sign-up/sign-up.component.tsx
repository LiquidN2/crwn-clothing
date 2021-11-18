import './sign-up.styles.scss';
import React, { FormEventHandler, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { signUp } from '../../firebase/firebase.utils';

const SignUp: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    // console.log(email, password, displayName);

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

      await signUp({ email, password, displayName });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
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

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
