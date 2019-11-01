import React, { Component } from 'react';

// FIREBASE AUTH
import {
  auth,
  createUserProfileDocument,
  handleFirebaseSignUpError,
} from 'firebase/firebase.utils';

// CHILD COMPONENTS
import FormInput from 'components/form-input/form-input.component';
import CustumButton from 'components/custom-button/custom-button.component';

// STYLES
import './sign-up.styles.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
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

    const { displayName, email, password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      return alert("Passwords don't match");
    }

    try {
      // 1. Create user authentication in firebase
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // 2. Store the created user in firestore
      createUserProfileDocument(user, { displayName });

      // 3. Reset the component state
      this.setState({
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
    } catch (error) {
      handleFirebaseSignUpError(error);
    }
  };

  render() {
    const { displayName, email, password, passwordConfirm } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            id="displayName-sign-up"
            name="displayName"
            value={displayName}
            onChange={this.handleInputChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            id="email-sign-up"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            id="password-sign-up"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            id="password-confirm-sign-up"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.handleInputChange}
            label="Confirm Password"
            required
          />
          <div className="buttons">
            <CustumButton type="submit">Sign In</CustumButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
