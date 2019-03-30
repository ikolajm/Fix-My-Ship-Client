import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signup: false,
      // Auth
      username: '',
      password: '',
      passwordConf: '',
      email: ''
    };
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value.trim() 
      })
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      login: !prevState.login,
      username: '',
      password: ''
    }));
  }

  toggleSignup = () => {
    this.setState(prevState => ({
      signup: !prevState.signup,
      username: '',
      password: '',
      passwordConf: '',
      email: ''
    }));
  }

  submitLogin = () => {
    fetch(`http://localhost:3001/user/signin`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(results => results.json())
    .then(json => {
        this.props.storeAuthData(json.user, json.token)
        localStorage.setItem('token', json.token)
    })
    .catch(err => console.log(err.message))
  }

  submitSignup = () => {
    fetch(`http://localhost:3001/user/signup`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(results => results.json())
    .then(json => {
        this.props.storeAuthData(json.user, json.token)
        localStorage.setItem('token', json.token)
    })
    .catch(err => console.log(err.message))
  }

  render() {
    return (
        <div className="auth-btn-container">
            {/* Login */}
            <Button className="first-btn" color="danger" onClick={this.toggleLogin}>Login</Button>
            <Modal isOpen={this.state.login} toggle={this.toggleLogin}>
                <ModalHeader>Login</ModalHeader>
                <ModalBody>
                    <label>
                        Username:<br />
                        <input name="username" type="text" onChange={this.handleChange} value={this.state.username} required />
                    </label><br />
                    <label>
                        Password:<br />
                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password} required />
                    </label><br />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitLogin}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggleLogin}>Cancel</Button>
                </ModalFooter>
            </Modal>
            {/* Signup */}
            <Button color="danger" onClick={this.toggleSignup}>Signup</Button>
            <Modal isOpen={this.state.signup} toggle={this.toggleSignup}>
                <ModalHeader>Signup</ModalHeader>
                <ModalBody>
                    <label>
                        Username:<br />
                        <input name="username" type="text" onChange={this.handleChange} value={this.state.username} required />
                    </label><br />
                    <label>
                        Email:<br />
                        <input name="email" type="email" onChange={this.handleChange} value={this.state.email} required />
                    </label><br />
                    <label>
                        Password:<br />
                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password} required />
                    </label><br />
                    <label>
                        Confirm Password:<br />
                        <input name="passwordConf" type="password" onChange={this.handleChange} value={this.state.passwordConf} required />
                    </label><br />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitSignup}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggleSignup}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
  }
}