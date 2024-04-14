var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("./config");
var passport = require("passport");
var authenticate = require("./authenticate");
const { MongoClient, ServerApiVersion } = require("mongodb");

var stockRouter = require("./routes/stockRouter");
var userRouter = require("./routes/userRouter");

const port = 8000;

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("Connected correctly to MongoDB");
//   })
//   .catch((err) => console.log(err));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set('port', port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));
app.use("/portfolio", stockRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
