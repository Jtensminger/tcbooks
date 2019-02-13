import React,{ Component } from "react"
import { Query } from  "react-apollo"
import gql from "graphql-tag"
import { Link } from "react-router-dom"
import { Item, Segment, Responsive } from 'semantic-ui-react'

class Tcbooks extends Component {
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

  render() {
    let groupAccess = null
    if (this.props.auth.profile) {
      if (this.props.auth.profile.groups) {
        groupAccess = Object.values(this.props.auth.profile.groups)
      }
    }

    return (
        <Query query={gql`
          {
            tcBooks(where: {
                OR: [{
                  groupAccess_in: "${groupAccess}"
                }, {
                  groupAccess: null
                }]
              }) {
              id
              bookTitle
              bookContent
              author {
                id
                fullName
              }
            }
          }
        `}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>
            return <Item.Group>{ data.tcBooks.map((tcbook, index) => (
              <Responsive key={index} as={Segment} minWidth={315}>
                <Item key={index}>
                  <Item.Content>
                    <Item.Header as="h2">
                    <Link to={{pathname: `/book/${tcbook.id}/${tcbook.bookTitle.replace(/\s+/g, '-').toLowerCase()}`}}>{tcbook.bookTitle}</Link>
                    </Item.Header>
                    <Item.Description>{tcbook.author && `by ${tcbook.author.fullName}`}</Item.Description>
                  </Item.Content>
                </Item>
              </Responsive>
              )
            ) }</Item.Group>
          }}
        </Query>
    )
  }
}

export default Tcbooks
// <Tcbook tcbook={tcbook} />
