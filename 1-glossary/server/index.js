require("dotenv").config();
const express = require("express");
const path = require("path");
let {create, find} = require('./db.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ))
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/gloss', (req, res) => {
  find({})
      .then((words) => {
        res.send(words);
      })

})

app.post('/gloss', (req, res) => {
  console.log(req.body);
  create(req.body)
      .then((word) => {
        res.status(201).send();
      })
      .catch((err) => {
        console.error(err);
      })

})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
