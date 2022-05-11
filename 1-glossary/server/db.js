const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/${process.env['DB_NAME']}`)

// 2. Set up any schema and models needed by the app
const wordSchema = new mongoose.Schema({
  word: String,
  definition: String
})

const Word = mongoose.model('Word', wordSchema);

let create = (words) => {
  // add to database with create
  return Word.create(words)
      .exec();
}

let find = () => {
  return Word.find({})
      .exec()
}

// 3. Export the models
module.exports.Word = Word;
module.exports.create = create;
module.exports.find = find;
// 4. Import the models into any modules that need them
