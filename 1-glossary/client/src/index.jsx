import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import axios from "axios";
import Search from "./components/Search.jsx";
import AddWord from "./components/AddWord.jsx";
import WordList from "./components/WordList.jsx";


class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      searched: [],
      searching: false
    };

    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    this.searchClear = this.searchClear.bind(this);
  }

  componentDidMount() {
    axios.get('/gloss')
      .then((response) => {
        // console.log(response.data);
        this.setState({
          words: response.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  add(wordObj) {
    axios.post('/gloss', wordObj)
      .then(() => {
        return axios.get('/gloss')
      })
      .then((response) => {
        this.setState({
          words: response.data
        })
      })
      .catch((err) => {
        console.log(err);
        alert('This word already exists. Please enter a new one.');
      })
  }

  edit(wordObj) {
    let parsedWordObj = JSON.parse(wordObj);
    let wordOrDef = prompt('would you like to update the word, definition, or both');

    if (wordOrDef === 'both') {
      parsedWordObj.word = prompt('please enter updated word');
      parsedWordObj.definition = prompt('please enter the update definition');
    } else if (wordOrDef === 'word') {
      parsedWordObj.word = prompt('please enter updated word');
    } else if (wordOrDef === 'definition') {
      parsedWordObj.definition = prompt('please enter the update definition');
    } else {
      alert('Refresh and try again by entering: "word" or "definition" or "both"');
    }

    axios.post('/gloss/edit', parsedWordObj)
      .then(() => {
        return axios.get('/gloss')
      })
      .then((response) => {
        this.setState({
          words: response.data
        })
      })
      .catch((err) => {
        alert('Unable to edit word or definition.')
      })
  }

  delete(wordObj) {
    let parsedWordObj = JSON.parse(wordObj);
    axios.post('/gloss/delete', parsedWordObj)
      .then(() => {
        return axios.get('/gloss')
      })
      .then((response) => {
        this.setState({
          words: response.data
        })
      })
      .catch((err) => {
        alert('Unable to delete word or definition.')
      })
  }
  // write search functions in express and db
  search(searchWord) {
    // console.log(searchWord);
    let searchObj = {
      word: searchWord
    }
    // move into axios.get.then once express and db functions are written
    this.setState({
      searching: true
    })
    axios.get('/gloss/search', searchObj)
      .then((response) => {
        this.setState({
          search: response.data,
        })
      })
      .catch((err) => {
        alert('What you searched does not exist in storage.');
      })
  }
  // write search clear to update this.searching to false
  searchClear() {
    this.setState({
      searching: false
    })
  }

  render () {
    return (
      <>
        <h1 classID="title">Glossary</h1>
        <AddWord onAdd={this.add}/>
        <Search onSearch={this.search} onSearchClear={this.searchClear}/>
        <div>
          Words and Definitions:
          <WordList
            words={this.state.words}
            onEdit={this.edit}
            onDelete={this.delete}
          />
        </div>
      </>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById("root")
);