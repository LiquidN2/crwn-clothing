import React, { ComponentType } from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

interface WithSpinnerProps {
  isLoading: boolean;
}

const withSpinner =
  (WrappedComponent: ComponentType): React.FC<WithSpinnerProps> =>
  ({ isLoading, ...otherProps }) =>
    isLoading ? (
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    ) : (
      <WrappedComponent {...otherProps} />
    );

export default withSpinner;
