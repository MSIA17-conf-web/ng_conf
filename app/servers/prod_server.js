var env = require('dotenv').config();
// console.log(env.parsed);

// Dependencies
const fs = require("fs"),
  http = require("http"),
  path = require("path"),
  cors = require("cors"),
  express = require("express"),
  bodyParser = require("body-parser"),
app = express()


app.get("*", function (req, res, next) {

  console.log("Got request on ", req.path);
  next();
})

app.use(cors());
app.use(express.static(path.join(__dirname, "/..", "dist")))
app.use(bodyParser.json())

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })
app.get("/hello", (req, res) => {
  res.send({res: "Bonjour"}).end();
})
// app.get("/", function (req, res) {
//   console.log('Sending index.html');
  
//   res.sendFile("../dist/index.html", { root: __dirname })
// })

const httpServer = http.createServer(app)

httpServer.listen(process.env.PROD_SERVER_PORT, () => {
  console.log("HTTPS Server running on port " + process.env.PROD_SERVER_PORT);
})