import React from "react";
import F2 from "./F2.jsx";

class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      obscurePass: '',
      nexting: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.generateObscurePassword = this.generateObscurePassword.bind(this);
  }

  handleEmail(e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces and must include an @ symbol');
    } else {
      this.setState({
        email: e.target.value
      });
    }
  }

  handlePass (e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces in passwords');
    } else if (e.target.value.length >= 20) {
      alert('Password cannot be longer than 20 characters');
    } else {
      this.setState({
        password: e.target.value
      });

    }
  }

  generateObscurePassword(password) {
    let obscurePassword = '';
    for (var i = 0; i < password.length; i++) {
      obscurePassword = obscurePassword + '*';
    }
    this.setState({
      obscurePass: obscurePassword
    })
  }

  handleNext(e) {
    e.preventDefault();
    console.log("on to shipping");
    console.log(this.state.email, this.state.password);
    if (this.state.password === "" || this.state.email === "") {
      alert('Please provide your email and new account password in order to proceed.');
    } else if (!this.state.email.includes("@")) {
      alert('Email must include an @ symbol.');
    } else if (this.state.password.length < 6) {
      alert('Password must contain a minimum of 7 characters');
    } else {
      this.generateObscurePassword(this.state.password);
      this.setState({
        nexting: true
      })
      this.props.onNewAccount({
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  render() {
    return (
      <>
        <h2>Create an Account</h2>
        <form>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmail}/>
            Password:
            <input type="text"
              value={
                this.state.nexting !== true ?
                this.state.password :
                this.state.obscurePass
              }
              onChange={this.handlePass}/>
          </label>
          {
          this.state.nexting === false ?
          <input type="submit" value="Next" onClick={this.handleNext}/> :
          <div>
            Please enter your shipping information so we can send you these fabulous goodies!
          </div>
          }
        </form>
        <>
          {this.state.nexting === true ? <F2 onNewAccount={this.props.onNewAccount.bind(this)}/> : "After clicking next, we'll be collecting your shipping address."}
        </>
      </>
    )
  }
}

export default F1;