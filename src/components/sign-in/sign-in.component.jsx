import React, { Component } from 'react';

// FIREBASE AUTH
import {
  auth,
  signInWithGoogle,
  handleFirebaseSignInError,
} from 'firebase/firebase.utils';

// CHILD COMPONENTS
import FormInput from 'components/form-input/form-input.component';
import CustumButton from 'components/custom-button/custom-button.component';

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

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      handleFirebaseSignInError(error);
    }
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
