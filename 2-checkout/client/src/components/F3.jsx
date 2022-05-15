import React from "react";

class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: '',
      expire: '',
      cvv: '',
      billZip: '',
    }
    this.handlePurchasing= this.handlePurchasing.bind(this);
    this.handleCredit = this.handleCredit.bind(this);
    this.handleExpiration = this.handleExpiration.bind(this);
    this.handleCvv = this.handleCvv.bind(this);
    this.handleBillZip = this.handleBillZip.bind(this);
  }

  handleCredit(e) {
  if (!Number(e.target.value)) {
    alert('must use numbers');
  } else if (e.target.value.length > 24) {
    alert('card number cannot be longer than 24 numbers');
  } else {
    this.setState({
      credit: e.target.value
    });
  }
  }

  handleExpiration (e) {
    this.setState({
      expire: e.target.value
    });
  }

  handleCvv (e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces. Can only use numbers');
    } else if (!Number(e.target.value)) {
      alert('must use numbers');
    } else if (e.target.value.length > 4) {
      alert('Cannot be longer than 4 numbers');
    } else {
      this.setState({
        cvv: e.target.value
      });
    }
  }

  handleBillZip (e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces for zipcodes');
    } else if (!Number(e.target.value)) {
      alert('must use numbers');
    } else if (e.target.value.length > 5) {
      alert('Billing zipcode cannot be longer than 5 numbers');
    } else {
      this.setState({
        billZip: e.target.value
      });
    }
  }

  handlePurchasing(e) {
    e.preventDefault();
    console.log("Make it rain!");
    // console.log(this.state.credit, this.state.expire, this.state.cvv, this.state.billZip);
    if (this.state.credit === '' || this.state.expire === '' || this.state.cvv === '' || this.state.billZip === '') {
      alert('Please make sure to fill in all fields');
    } else if (this.state.cvv.length < 3) {
      alert('CVV must be a minimum of 3 numbers');
    } else {
      this.props.onPurchase({
        email: this.props.email,
        credit: this.state.credit,
        expiration: this.state.expire,
        cvv: this.state.cvv,
        billZip: this.state.billZip
      })
    }
  }

  render() {
    return (
      <>
        <h4>Credit Card Info</h4>
        <form>
          <label>
            <div>
              Credit Card Number:
              <input type="text" value={this.state.credit} onChange={this.handleCredit}/>
            </div>
            <div>
              Expiry Date:
              <input type="text" value={this.state.expire} onChange={this.handleExpiration}/>
            </div>
            <div>
              CVV:
              <input type="text" value={this.state.cvv} onChange={this.handleCvv}/>
            </div>
            <div>
              Billing Zip Code:
              <input type="text" value={this.state.billZip} onChange={this.handleBillZip}/>
            </div>
          </label>
          <button type="submit" value="Purchase" onClick={this.handlePurchasing}>Purchase</button>
        </form>
      </>
    )
  }
}

export default F3;