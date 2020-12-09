import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

class Login extends Component {
  state = { username: "", email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
