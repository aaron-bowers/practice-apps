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
    this.handlePurchase= this.handlePurchase.bind(this);
    this.handleCredit = this.handleCredit.bind(this);
    this.handleExpiration = this.handleExpiration.bind(this);
    this.handleCvv = this.handleCvv.bind(this);
    this.handleBillZip = this.handleBillZip.bind(this);
  }

  handleCredit(e) {
    this.setState({
      credit: e.target.value
    });
  }

  handleExpiration (e) {
    this.setState({
      expire: e.target.value
    });
  }

  handleCvv (e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces. Can only use numbers');
    } else {
      this.setState({
        cvv: e.target.value
      });
    }
  }

  handleBillZip (e) {
    if (e.target.value.includes(' ')) {
      alert('Cannot use spaces for zipcodes');
    } else {
      this.setState({
        billZip: e.target.value
      });
    }
  }

  handlePurchase(e) {
    e.preventDefault();
    console.log("Make it rain!");
    // console.log(this.state.credit, this.state.expire, this.state.cvv, this.state.billZip);
    if (this.state.credit === '' || this.state.expire === '' || this.state.cvv === '' || this.state.billZip === '') {
      alert('Please make sure to fill in all fields');
    } else {
      this.setState({
        nexting: true
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
          <button type="submit" value="Purchase" onSubmit={this.handlePurchase}>Purchase</button>
        </form>
      </>
    )
  }
}

export default F3;