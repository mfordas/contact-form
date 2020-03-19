import React from 'react';

const ErrorMessage = (props) => {
    return props.message ? <div className="errorMessage">{props.message}</div> : null
  }

export default ErrorMessage;