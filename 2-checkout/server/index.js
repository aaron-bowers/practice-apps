require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post("/user", (req, res) => { // because it's post and data is being passed in as the 2nd arg to post, that data will be found in req.body
  console.log(req.body);
  let postData = [req.body.email, req.body.password, req.body.cookie];
  let queryString = "INSERT INTO responses (email, password, cookie) VALUES (?, ?, ?)";
  db.queryAsync(queryString, postData)
    .then(response => {
      // console.log('inserted account data: ', response);
      res.send('Account added');
    })
    .catch(err => {
      res.status(400);
    })
})

app.post("/shipping", (req, res) => { // because it's post and data is being passed in as the 2nd arg to post, that data will be found in req.body
  console.log(req.body, req.session_id);
  let postData = [req.body.street, req.body.city, req.body.state, req.body.zip, req.body.email];
  let queryString = "UPDATE responses SET responses.street = ?, responses.city = ?, responses.state = ?, responses.zipcode = ? WHERE responses.email = ?";
  db.queryAsync(queryString, postData)
    .then(response => {
      console.log('Updated account with shipping info: ', response);
      res.send('Shipping info added');
    })
    .catch(err => {
      res.status(400);
    })
})

app.post("/purchase", (req, res) => { // because it's post and data is being passed in as the 2nd arg to post, that data will be found in req.body
  console.log(req.body, req.session_id);
  let postData = [req.body.credit, req.body.expiration, req.body.cvv, req.body.billZip, req.body.email];
  let queryString = "UPDATE responses SET responses.credit = ?, responses.expiration = ?, responses.cvv = ?, responses.billZip = ? WHERE responses.email = ?";
  db.queryAsync(queryString, postData)
    .then(response => {
      console.log('Updated account with credit card info: ', response);
      res.send('Credit Card info added');
    })
    .catch(err => {
      res.status(400);
    })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);