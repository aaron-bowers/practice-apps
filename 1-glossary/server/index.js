require("dotenv").config();
const express = require("express");
const path = require("path");
let {getAll, create, editWord, deleteWord} = require('./db.js');

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

})

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
