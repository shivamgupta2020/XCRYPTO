const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);
