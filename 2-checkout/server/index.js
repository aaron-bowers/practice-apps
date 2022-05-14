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

})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);