import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import axios from "axios";
import Search from "./components/Search.jsx";
import WordList from "./components/WordList.jsx";


class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: []
    };
  }

  componentDidMount() {
    axios.get('/gloss')
      .then((response) => {
        // console.log(response.data);
        this.setState({
          words: response.data
        })
      })
  }



  render () {
    return (
      <>
        <h1 classID="title">Glossary</h1>
        <Search />
        <div>
          Words and Definitions:
          <WordList words={this.state.words}/>
        </div>
      </>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById("root")
);