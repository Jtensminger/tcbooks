// src/Callback/Callback.js
import React from 'react';
import { withRouter } from 'react-router';
import loading from './images/loading.svg';

function Callback(props) {
  props.handleAuthentication().then(() => {
    props.history.push('/');
  });

  return (
    <div>
      Loading user profile.
      <img src={loading} alt="loading" />
    </div>
  );
}

export default withRouter(Callback);
