import React from 'react';
import firebase from 'firebase';

class UserControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      activeUser: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('we got user!');
        console.log(user);
        this.setState({ userId: user.email, activeUser: true });
      } else {
        this.setState({ userId: null, activeUser: false });
      }
    });
  }

  render() {
    return (
      <div>
        <p>
          User thing
        </p>
        { this.state.userId
          && (
            <span>
              Hello,&nbsp;
              { this.state.userId }
            </span>
          )
        }
        { !this.state.activeUser
          && (
            <span>
              No user
            </span>
          )
        }
      </div>
    );
  }
}

export default UserControls;
