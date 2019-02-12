import React,{ Component } from "react"
import { Query } from  "react-apollo"
import gql from "graphql-tag"
import TcbookMarkdownRenderer from "./tcBookMarkdownRenderer"
import { withRouter } from 'react-router';

class Tcbook extends Component {

    componentWillMount() {
      if(this.props.authenticated) {
        this.setState({ profile: {} });

        const { userProfile, getProfile } = this.props.auth;

        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
      } else {
        this.setState({profile: null})
      }
    }

    componentDidMount() {
      if(this.props.authenticated) {
        const { userProfile, getProfile } = this.props.auth;

        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
      } else {
        this.setState({profile: null})
      }
    }

  render() {
    const { profile } = this.state;
    let groupAccess = null
    if (profile) {
      if (profile.groups) {
        groupAccess = Object.values(profile.groups)
      }
    }
    return (
        <Query query={gql`
          {
            tcBook( where: {
                id: "${this.props.match.params.id}"
              }
            ) {
            bookTitle
            bookContent
            groupAccess
            author {
              fullName
              tcBooks {
                id
                bookTitle
              }
            }
          }
        }
        `}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>
            if (!this.props.auth.hasGroup(data.groupAccess)) return <p>You don't have the correct group permission to see this book</p>
            return <TcbookMarkdownRenderer pathname={this.props.location.pathname} tcbook={data.tcBook} />
          }}
        </Query>
    )
  }
}


export default withRouter(Tcbook)
