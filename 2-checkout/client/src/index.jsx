import React from "react";
import { render } from "react-dom";
import {get, post} from "axios";
import F1 from "./components/F1.jsx";

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookie: JSON.stringify(document.cookie, undefined, "\t"),
      checkingOut: false,
      purchased: false
    }
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleShipping = this.handleShipping.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  handleCheckOut (e) {
    console.log("checkout");
    this.setState({
      checkingOut: true
    })
  }

  handleNewAccount(newAccount) {
    console.log(newAccount);
    post("/user", newAccount)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleShipping(shippingInfo) {
    console.log(shippingInfo);
    post("/shipping", shippingInfo)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handlePurchase(creditInfo) {
    console.log(creditInfo);
    post("/purchase", creditInfo)
      .then(response => {
        console.log(response);
        this.setState({
          purchased: true
        })
      })
      .catch(err => {
        console.log(err);
        alert('Unable to complete purchase. Please confirm that all of your credit card information is correct.')
      })
  }


  render() {
    return (
      <>
        {this.state.checkingOut === true ? // if checking out
          <F1 onNewAccount={this.handleNewAccount} onShipping={this.handleShipping} onPurchase={this.handlePurchase}/> : // display F1, ':' otherwise display home page
          <div>
            <h1>Hello, Buy More Customers!</h1>
            <span>
              <button onClick={this.handleCheckOut}>Checkout</button>
            </span>
            <>
            </>
            <p>
              <code>Page Cookie: {this.state.cookie}</code>
            </p>
          </div>
        }
      </>
    )
  }
}

render(
  <Root />,
  document.getElementById("root")
);
