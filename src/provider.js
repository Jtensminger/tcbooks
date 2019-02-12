import React from "react"
import Auth from "./auth"
const auth = new Auth();

const defaultContextValue = {
  data: {
    // set your initial data shape here
    authenticated: false,
    siteTitle: "TC Books"
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  componentDidMount() {
    const { renewSession } = auth
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession()
      this.setData({authenticated: true})
    }
  }


  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }
