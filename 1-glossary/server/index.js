require("dotenv").config();
const express = require("express");
const path = require("path");
let {getAll, create, editWord, deleteWord, dbSearch} = require('./db.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ))
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/gloss', (req, res) => {
  getAll({})
      .then((words) => {
        res.send(words);
      })
      .catch((err) => {
        res.status(400).send('Unable to fulfill request at this time');
      })
})

app.get(`/gloss/search/`, (req, res) => {
  console.log(req.query.userInput);
  dbSearch(req.query.userInput)
    .then((searchedWords) => {
        console.log(searchedWords);
        res.send(searchedWords);
      })
      .catch((err) => {
        res.status(400).send('Unable to find searched words');
      })
})

// app.get(`/gloss/search/:userInput`, (req, res) => {
//   // console.log(req.body);
//   dbSearch(req.params.userInput)
//     .then((searchedWords) => {
//         console.log(searchedWords);
//         res.send(searchedWords);
//       })
//       .catch((err) => {
//         res.status(400).send('Unable to find searched words');
//       })
// })

app.post('/gloss', (req, res) => {
  create(req.body)
      .then((word) => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send('This word already exists.')
      })
})

app.post('/gloss/edit', (req, res) => {
  editWord(req.body)
      .then((word) => {
        res.status(200).send(`updated ${req.body['_id']} in the database`);
      })
      .catch((err) => {
        console.error(`edit error: ${err}`);
      })
})

app.post('/gloss/delete', (req, res) => {
  deleteWord(req.body)
      .then((word) => {
        res.status(200).send(`deleted ${req.body['_id']} from the database`);
      })
      .catch((err) => {
        console.error(`delete error: ${err}`);
      })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
