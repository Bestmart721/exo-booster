// src/ErrorBoundary.js
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const FallbackComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const MyErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
