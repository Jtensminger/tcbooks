import React, { Component } from 'react';
import Avatar from '@atlaskit/avatar';

const styles = {
  column: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0.5em 1em',
  },
  row: {
    alignItems: 'stretch',
    display: 'flex',
    height: 192,
    justifyContent: 'stretch',
    marginTop: '1em',
  },
};


class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;

    return (
      <div className="container">
        <div className="profile-area">
          <div style={styles.row}>
            <div style={{...styles.column, backgroundColor: "#172B4D"}}>
              <Avatar
                appearance="circle"
                name={profile.nickname}
                size="xxlarge"
                src={profile.picture}
              />
              <p style={{color: "white"}}>{profile.nickname}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
