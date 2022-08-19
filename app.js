var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { sequelize } = require("./models/index"); // sequelize
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var notifyRouter = require("./routes/notify");

var app = express();

const router = require("./routes/index");

// view engine setup to use pug
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "pug");

app.use(cors());
//app.use is connecting to middle-ware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//public static location setup
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notify", notifyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// sequelize sync
sequelize
  .sync({ force: false }) // when starting server, making table y/n
  .then(() => {
    console.log("sueccess to connect with DB");
  })
  .catch((err) => {
    console.error(err);
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

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), " - waiting in empty port");
});

//object convert to module
module.exports = app;
