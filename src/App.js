import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import 'isomorphic-fetch'
import Header from "./header"
import Tcbooks from "./tcbooks"
import Tcbook from "./tcbook"
import SEO from "./seo"
import Callback from "./callback"
import Error from "./error"
import Profile from "./components/profile"
import Home from "./components/home"
import styled from 'styled-components';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjrmslxs03j1n01htiaisw9d9/master',
  headers: {authorization: `Bearer ${process.env.REACT_APP_GRAPHCMS}`}
})

const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const AppWrapper = styled.div`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
`

const light = {
  fg: "#283447",
  bg: "#fefefe"
};

const dark = {
  fg: "#fefefe",
  bg: "#283447"
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: null,
      themeMode: 'light'
    }
  }

  switchTheme = () => {
    const { themeMode } = this.state;
    this.setState({
      themeMode: themeMode === 'light' ? 'dark' : 'light',
    });
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
    const { themeMode } = this.state
    const { auth } = this.props
    return (
        <Router>
          <ApolloProvider client={client}>
            <AppWrapper theme={themeMode === 'light' ? light : dark}>
              <Header auth={auth} themeMode={themeMode} switchTheme={this.switchTheme} />
              <SEO title="Home" keywords={[`tradecraft`, `markdown`, `books`]} />
              <ContentWrapper>
                <div>
                      <Switch>
                        <Route exact path="/books" render={(props) => <Tcbooks authenticated={this.state.authenticated} auth={auth} {...props}/>} />
                        <Route exact path="/book/:id/:title" render={(props) => <Tcbook authenticated={this.state.authenticated} auth={auth} {...props}/>} />
                        <Route path="/profile" render={(props) => (
                          !auth.isAuthenticated() ? (
                            <Redirect to="/"/>
                          ) : (
                            <Profile auth={auth} {...props} />
                          )
                        )} />
                        <Route exact path="/callback" render={(props) => {
                          return <Callback handleAuthentication={auth.handleAuthentication} {...props} />
                        }}/>
                        <Route exact path="/" render={(props) => auth.isAuthenticated() ? <Redirect to="/books"/> : <Home auth={auth} {...props}/>}/>
                        <Route exact component={Error} />
                      </Switch>
                </div>
              </ContentWrapper>
            </AppWrapper>
          </ApolloProvider>
        </Router>
    )
  }
}

export default App;
