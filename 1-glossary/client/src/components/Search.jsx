import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.')
  }

  render () {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Search</button>
        </form>
      </>
    )
  }
}

export default Search;