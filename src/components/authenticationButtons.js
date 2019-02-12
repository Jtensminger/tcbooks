import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react'

class AuthenticationButtons extends Component {
    constructor(props) {
      super(props)
      this.state = {
        authenticated: null
      }
    }


    handleLogout = () => {
      this.props.auth.logout()
      this.setState({authenticated: this.props.auth.isAuthenticated()})
      this.props.history.push("/")
    }

    handleLogin = () => {
      this.props.auth.login()
    }

    loginVerification = () => {
      const { renewSession, isAuthenticated } = this.props.auth

      if (localStorage.getItem('isLoggedIn') === 'true') {
        renewSession().then(() => {
        if(this.state.authenticated !== isAuthenticated()) {
          this.setState({authenticated: isAuthenticated()})
        }
      })
    } else if (this.state.authenticated !== isAuthenticated()) {
      this.setState({authenticated: isAuthenticated()})
      }
    }

    compondentWillMount() {
      this.loginVerification()
    }

    componentDidMount() {
      this.loginVerification()
    }

    componentDidUpdate() {
      this.loginVerification()
    }

    render() {

    return(this.state.authenticated === null ? null :
      <div>
        {
              this.state.authenticated === false && (
                  <Button
                    basic
                    content='Sign in'
                    color='blue'
                    onClick={this.handleLogin}
                  />
                )
        }

        {
              this.state.authenticated && (
                  <Button
                    basic
                    content='Sign out'
                    color='red'
                    onClick={this.handleLogout}
                  />
                )
        }
    </div>
    )
}
}

export default withRouter(AuthenticationButtons)
