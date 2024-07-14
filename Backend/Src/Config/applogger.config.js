const { createLogger, format, transports } = require("winston");
const { DEVELOPMENT_MODE } = require("./index");
const { combine, timestamp, json, splat } = format;

const DevelopmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), json(), splat()),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "app-combined.log" }),
      new transports.File({ filename: "app-info.log", level: "info" }),
      new transports.File({ filename: "app-warn.log", level: "warn" }),
      new transports.File({ filename: "app-error.log", level: "error" }),
      // new transports.File({ filename: "app-debug.log", level: "debug" }),
    ],
  });
};
const ProductionLogger = () => {
  // return createLogger({
  //   level: "info",
  //   format: combine(timestamp(), json(), splat()),
  //   transports: [
  //     //   new transports.File({ filename: "app-error.log", level: "error" }),
  //   ],
  // });
  return {
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
};

const logger =
  DEVELOPMENT_MODE === "development" ? DevelopmentLogger() : ProductionLogger();

module.exports = logger;
