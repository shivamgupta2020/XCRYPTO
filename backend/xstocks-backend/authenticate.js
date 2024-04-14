var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/User");

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");

var config = require("./config.js");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  // return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
  return jwt.sign(user, config.secretKey);
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }).then((err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) throw new Error("Please Authenticate");
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, config.secretKey);
    const user = await User.findOne({ _id: decode._id });
    if (!user) throw new Error("Please Authenticate");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
