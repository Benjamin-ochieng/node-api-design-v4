import merge from "lodash.merge";

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  env,
  isDev: env === "development" || env === "dev",
  isTest: env === "testing" || env === "test",
  port: 3001,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").default;
    break;
  case "test":
  case "testing":
    envConfig = require("./testing").default;
    break;
  case "prod":
  case "production":
    envConfig = require("./prod").default;
    break;

  default:
    envConfig = require("./dev").default;
}

export default merge(baseConfig, envConfig);
