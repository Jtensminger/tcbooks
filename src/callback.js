// src/Callback/Callback.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import loading from './images/loading.svg';

class Callback extends Component {
  
componentDidMount() {
  this.props.handleAuthentication().then(() => {
    this.props.history.push('/');
  });
}

render() {
  return (
    <div>
      Loading user profile.
      <img src={loading} alt="loading" />
    </div>
  )}
}

export default withRouter(Callback);
