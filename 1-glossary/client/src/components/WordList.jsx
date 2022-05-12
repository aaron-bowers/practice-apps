import React from "react";


class WordList extends React.Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onEditClick (e) {
    (e).preventDefault;
    console.log('clicked edit');
    this.props.onEdit(e.target.value);
  }

  onDeleteClick (e) {
    (e).preventDefault;
    console.log('clicked delete');
    this.props.onDelete(e.target.value);
  }

  render() {

    return (
      <>
        {this.props.words.map((word, id) => {
          return (
            <div key={id}>
              <button className="edit-btn" value={JSON.stringify(word)} onClick={this.onEditClick}>edit</button>
              <button className="delete-btn" value={JSON.stringify(word)} onClick={this.onDeleteClick}>delete</button>
              <span>{word.word}: {word.definition}</span>
            </div>
          )})
        }
      </>
    )
  }
};

export default WordList;