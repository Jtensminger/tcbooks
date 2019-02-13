import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react'

class AuthenticationButtons extends Component {
    handleLogout() {
      this.props.auth.logout()
      this.props.history.push("/")
    }

    handleLogin() {
      this.props.auth.login()
    }

    componentWillMount() {
      // this.loginVerification()
      const { renewSession } = this.props.auth;

      if (localStorage.getItem('isLoggedIn') === 'true') {
        renewSession();
      }
    }

    componentDidMount() {
      // this.loginVerification()
      const { renewSession } = this.props.auth;

      if (localStorage.getItem('isLoggedIn') === 'true') {
        renewSession();
      }
    }

    // componentDidUpdate() {
    //   // this.loginVerification()
    // }

    render() {
    const { isAuthenticated } = this.props.auth; 
    // this.state.authenticated === null ? null :
    return(
      <div>
        {
              !isAuthenticated() && (
                  <Button
                    basic
                    content='Sign in'
                    color='blue'
                    onClick={this.handleLogin.bind(this)}
                  />
                )
        }

        {
              isAuthenticated() && (
                  <Button
                    basic
                    content='Sign out'
                    color='red'
                    onClick={this.handleLogout.bind(this)}
                  />
                )
        }
    </div>
    )
}
}

export default withRouter(AuthenticationButtons)
