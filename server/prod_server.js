var env = require('dotenv').config();
console.log(env.parsed);

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
// app.use(express.static(path.join(__dirname, "/..", "dist")))
app.use(bodyParser.json())
app.use("/", express.static(path.join(__dirname, '../', "dist")))

// app.get("/*", function (req, res) {
//   console.log("into");
//   // express.static(path.join(__dirname, '../', "dist"));
//   res.sendFile("../dist/index.html", { root: __dirname })
// })

app.get("/*", function (req, res) {
  res.writeHead(302, {
    "Location": "/"
  });
  res.cookie('requestedRoute', req.path, { maxAge: 900000, httpOnly: true });
  res.end()
})

app.get("/hello", (req, res) => {
  res.send({res: "Bonjour"}).end();
})

const httpServer = http.createServer(app)

httpServer.listen(process.env.PROD_SERVER_PORT, () => {
  console.log("HTTPS Server running on port " + process.env.PROD_SERVER_PORT);
})
