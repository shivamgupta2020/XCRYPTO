const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("../models/User");
const userRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

userRouter.use(bodyParser.json());
userRouter.use(cors.corsWithOptions);

userRouter.get("/", authenticate.verifyUser, function (req, res, next) {
  User.findOne({ _id: req.user._id })
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

userRouter.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save().then((user, err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
  });
});

// userRouter.get("/logout", (req, res, next) => {
//   if (req.session) {
//     req.session.destroy();
//     res.clearCookie("session-id");
//     res.redirect("/");
//   } else {
//     var err = new Error("You are not logged in!");
//     err.status = 403;
//     next(err);
//   }
// });

// userRouter.post("/logout", authenticate.verifyUser, (req, res, next) => {
//   // Set the token expiration time to a past date, effectively invalidating the token
//   const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
//   const decoded = jwt.decode(token); // Decode the token to get its payload
//   const exp = decoded.exp; // Get the expiration time of the token
//   const now = Math.floor(Date.now() / 1000); // Get the current time in seconds
//   const diff = exp - now; // Calculate the time difference between the expiration time and the current time
//   const newExp = now - diff - 1; // Set the new expiration time to a past date
//   const newToken = jwt.sign({ sub: decoded.sub }, config.secretKey, {
//     expiresIn: newExp,
//   }); // Sign a new token with the new expiration time

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.json({ success: true, token: newToken, status: "You are logged out" });
// });

module.exports = userRouter;
