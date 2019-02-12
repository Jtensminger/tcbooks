import React, { Component } from 'react'
import { Container, Header, Icon, Divider, Segment, Button } from "semantic-ui-react"
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Home extends Component {

  render() {
    const { authenticated, location, auth } = this.props
    if (authenticated) return <Redirect to={{pathname: "/books", state: { from: location }}} />
    return (
      <Container text>
        <Segment raised textAlign="center">
            <Header as="h1">A Modern Markdown Documentation Platform</Header>
            <Header as="h3">Share knowledge, boost your team's productivity and make your users happy.</Header>
        </Segment>
        <Divider horizontal><Icon color='black' name="code" size="large" /></Divider>
            <Segment textAlign="center">
                <Header as="h2">What are you waiting for?</Header>
                <Button basic icon color="blue" labelPosition='right' onClick={auth.login}>Give it a try<Icon color="blue" name='right arrow' /></Button>
            </Segment>
      </Container>
    )
  }
}

export default withRouter(Home)