const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/${process.env['DB_NAME']}`)

// 2. Set up any schema and models needed by the app
const wordSchema = new mongoose.Schema({
  word: {type: String, unique: true},
  definition: String
})

const Word = mongoose.model('Word', wordSchema);

let getAll = () => {
  return Word.find({});
}

let create = (word) => {
  let verifyWord = {
    word: word.word
  }
  return Word.create(word);
}

let editWord = (word) => {
  let dbId = {
    '_id': word['_id']
  }
  return Word.updateOne(dbId, word); // Model.update({filter}, {update})
}

let deleteWord = (word) => {
  let dbId = {
    '_id': word['_id']
  }
  return Word.deleteOne(dbId); // Model.deleteOne({condition})
}

let dbSearch = (searchWord) => {
  let searchObj = {
    word: { $regex: searchWord, $options: "i" }
  }
  // console.log(searchObj);
  return Word.find(searchObj);
}

// 3. Export the models
module.exports.Word = Word;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.editWord = editWord;
module.exports.deleteWord = deleteWord;
module.exports.dbSearch = dbSearch;
// 4. Import the models into any modules that need them
