import React from "react";

class AddWord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueWord: '',
      valueDef: ''
    };
    this.handleChangeWord = this.handleChangeWord.bind(this);
    this.handleChangeDef = this.handleChangeDef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeWord(e) {
    this.setState({
      valueWord: e.target.value
    })
  }
  handleChangeDef(e) {
    this.setState({
      valueDef: e.target.value
    })
  }
  handleClick(e) {
    console.log('You clicked submit.')
    e.preventDefault();
    if (!this.state.valueWord || !this.state.valueDef) {
      alert('Need to enter a word and/or definition.');
      return;
    }
    this.props.onAdd({
      word: this.state.valueWord,
      definition: this.state.valueDef
    });
    this.setState({
      valueWord: '',
      valueDef: ''
    })
  }

  render () {
    return (
      <>
        <form>
          <label>
            <input type="text" value={this.state.valueWord} onChange={this.handleChangeWord} placeholder="Add a word..."/>
            <input type="text" value={this.state.valueDef} onChange={this.handleChangeDef} placeholder="Add a definition..."/>
          </label>
          <button onClick={this.handleClick}>Add to database</button>
        </form>
      </>
    )
  }
}

export default AddWord;