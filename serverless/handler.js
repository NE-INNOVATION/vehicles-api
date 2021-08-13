"use strict";

const { saveVehicle } = require("../commons");
const connectDB = require("../config/db");

module.exports.api = async (event) => {
  const path = event.pathParameters.proxy;

  switch (path) {
    case "warmup":
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "success",
        }),
      };
    case "ping": {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Ping success",
        }),
      };
    }
    case "save": {
      connectDB();
      const quoteId = await saveVehicle(JSON.parse(event.body));
      return {
        statusCode: 200,
        body: JSON.stringify({
          quoteId,
        }),
      };
    }
    case "get": {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Get Vehicle",
        }),
      };
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
