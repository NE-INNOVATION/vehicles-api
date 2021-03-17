const express = require("express");
const health = require("@cloudnative/health-connect");
const winston = require("winston");
const connectDB = require("../config/db");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Connect Database
connectDB();

const healthcheck = new health.HealthChecker();

module.exports = () => {
  const app = express();
  app.set("json-spaces", 2);
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use((req, res, done) => {
    logger.info(`app.${req.originalUrl}`);
    done();
  });

  app.use("/live", health.LivenessEndpoint(healthcheck));
  app.use("/ready", health.ReadinessEndpoint(healthcheck));
  app.use("/health", health.HealthEndpoint(healthcheck));

  app.use(express.json({ extended: false }));
  app.use("/api", require("./api/vehicle"));

  return app;
};
