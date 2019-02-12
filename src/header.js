import PropTypes from "prop-types"
import React from "react"
import Nav from "./nav"
import styled from 'styled-components';
import AuthenticationButtons from "./components/authenticationButtons"
import { Container, Grid} from 'semantic-ui-react'
import { Link } from "react-router-dom"

const dark = {
  fg: "#1A212D",
  bg: "white"
};

const light = {
  fg: "white",
  bg: "#1A212D"
}

const HeaderWrapper = styled.div`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  text-align: center;
`

const Header = ({ context, auth, themeMode, switchTheme }) => (
  <header>
    <HeaderWrapper theme={themeMode === 'light' ? light : dark}>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {context.data.siteTitle}
        </Link>
      </h1>
      <Container text>
        <Grid columns={2} container stackable>
          <Grid.Column>
            <Nav />
          </Grid.Column>
          <Grid.Column verticalAlign='middle' textAlign='right'>
            <AuthenticationButtons auth={auth} />
          </Grid.Column>
        </Grid>
      </Container>
    </HeaderWrapper>
  </header>
)
//           <Button toggle basic color={themeMode === 'light' ? 'grey' : 'red'} onClick={switchTheme} content={`Switch theme (${themeMode})`}/>

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  context: ``,
  auth: ``
}

export default Header
