import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value === '') {
      alert('Need to enter a word to search for');
    } else {
      console.log('You clicked submit.')
      this.props.onSearch(this.state.value);
    }
  }

  handleClear(e) {
    e.preventDefault();
    console.log('You clicked clear.')
    this.setState({
      value: ''
    })
    this.props.onSearchClear();
  }

  render () {
    return (
      <>
        <form>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for a word..."/>
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
          <input type="submit" value="Clear Search" onClick={this.handleClear}/>
        </form>
      </>
    )
  }
}

export default Search;