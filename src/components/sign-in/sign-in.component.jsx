import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2 className="title">I have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            id="email-sign-in"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            id="password-sign-in"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustumButton type="submit">Sign In</CustumButton>
            <CustumButton isGoogleSignedIn onClick={signInWithGoogle}>
              Sign In With Google
            </CustumButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
