import React from "react"
import { NavLink } from "react-router-dom"
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';


class Nav extends React.Component {

  render() {
    return(
      <Menu text>
          <Menu.Item><NavLink to="/">Home</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/books">Books</NavLink></Menu.Item>
          <Menu.Item><NavLink to="profile">Profile</NavLink></Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(Nav)
