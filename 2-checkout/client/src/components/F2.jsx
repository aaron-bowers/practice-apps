import React from "react";
import F3 from "./F3.jsx";

class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      zip: '',
      nexting: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleStreet = this.handleStreet.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
  }

  handleStreet(e) {
    this.setState({
      street: e.target.value
    });
  }

  handleCity(e) {
    if (Number(e.target.value)) {
      alert('City cannot include numbers');
    } else {
      this.setState({
        city: e.target.value
      });
    }
  }

  handleState (e) {
    if (Number(e.target.value)) {
      alert('State cannot include numbers');
    } else {
      this.setState({
        state: e.target.value
      });
    }
  }

  handleZip (e) {
    if (e.target.value.includes(' ')) {
      alert('cannot use spaces');
    } else if (!Number(e.target.value)) {
      alert('must use numbers');
    } else if (e.target.value.length > 5) {
      alert('zipcode cannot be longer than 5 numbers');
    } else {
      this.setState({
        zip: e.target.value
      });
    }
  }

  handleNext(e) {
    e.preventDefault();
    console.log("on to credit card info");
    // console.log(this.state.street, this.state.state, this.state.zip);
    if (this.state.street === '' || this.state.city === '' || this.state.zip === '') {
      alert('Please make sure no fields are empty');
    } else {
      this.setState({
        nexting: true
      })
      this.props.onShipping({
        email: this.props.email,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
    }
  }

  render() {
    return (
      <>
        <h4>Shipping Address</h4>
        <form>
          <label>
            <div>
              Street Address:
              <input type="text" value={this.state.street} onChange={this.handleStreet}/>
            </div>
            <div>
              City:
            <input type="text" value={this.state.city} onChange={this.handleCity}/>
            </div>
            <div>State:
              <input type="text" value={this.state.state} onChange={this.handleState}/>
            </div>
            <div>
              Zipcode:
            <input type="text" value={this.state.zip} onChange={this.handleZip}/>
            </div>
          </label>
          {
          this.state.nexting === false ?
          <input type="submit" value="Next" onClick={this.handleNext}/> :
          <div>
            Please enter your credit card information! This site is completely secure, so no worries... maybe...
          </div>
          }
        </form>
        <>
          {this.state.nexting === true ? <F3 email={this.props.email} onPurchase={this.props.onPurchase}/> : "After clicking next, we'll be collecting your credit card information."}
        </>
      </>
    )
  }
}

export default F2;