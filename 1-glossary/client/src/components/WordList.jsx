import React from "react";
import { render } from "react-dom";


const WordList = ({words}) => {
  // console.log(words);

  return (
    <>
      {words.map((word, id) => {
        return (
          <div key={id}>
            <div>{word.word}: {word.definition}</div>
          </div>
        )})
      }
    </>
  )
};

export default WordList;