import React, { Component } from 'react';
import './App.css';

import Home from './components/Home'
import Navbar from './components/Navbar'

class App extends Component {
  state = {
      sessionToken: undefined,
      user: null
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
        if (token && this.state.user === null) {
            localStorage.removeItem('token');
        } else {
            if (token && this.state.sessionToken === undefined) {
                this.setState({
                    sessionToken: token
                });
            }
        }
  }

  storeAuthData = (user, token) => {
    this.setState({
      user: user,
      sessionToken: token
    })
  }

  clearAuthData = () => {
    this.setState({
      user: null,
      sessionToken: undefined
    })
    localStorage.clear()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar 
        storeAuthData={this.storeAuthData} 
        clearAuthData={this.clearAuthData}
        user={this.state.user}
        token={this.state.sessionToken} />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
