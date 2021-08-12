"use strict";

const connectDB = require("../config/db");
const { saveVehicle } = require("../server/api/vehicle");

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
      console.log("@@@@@@@@@@@@@@", JSON.parse(event.body));
      const quoteId = await saveVehicle({ body: JSON.parse(event.body) });
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
