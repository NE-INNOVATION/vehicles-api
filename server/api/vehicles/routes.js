const express = require("express");
var rn = require("random-number");
const router = express.Router({ mergeParams: true });
const dataStore = require("../../data/dataStore");
const axios = require("axios");
const { Agent } = require("https");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

var gen = rn.generator({
  min: 100000000,
  max: 999999999,
  integer: true,
});

const client = axios.create({
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});

router
  .route("/vehicleInfo/:id/:quoteId")
  .get(async (req, res) => {
    logger.info(
      `app.api.vehicles - getting vehicle with id - ${req.params.id}`
    );
    res.send(
      JSON.stringify(await getVehicleInfo(req.params.id, req.params.quoteId))
    );
  })
  .post(async (req, res) => {
    logger.info(`app.api.vehicles - creating new vehicle`);
    res.send(
      JSON.stringify({
        result: await saveVehicleInfo(req.body, req.params.quoteId),
      })
    );
  });

let getVehicleInfo = async (id, quoteId) => {
  try {
    let vehicle = await dataStore.findVehicle(quoteId);
    return vehicle;
  } catch (error) {
    logger.error(
      `app.api.vehicles - getting vehicle#${id}, from quote#${quoteId} failed - ${JSON.stringify(
        error
      )}`
    );
  }
};

let saveVehicleInfo = async (data, quoteId) => {
  try {
    let vehicle = "";
    vehicle = {};
    vehicle.quoteId = quoteId;
    vehicle.year = data.year;
    vehicle.make = data.make;
    vehicle.model = data.model;
    vehicle.vehicleOwned = data.vehicleOwned;
    vehicle.vehicleUsage = data.vehicleUsage;
    vehicle.daysDriven = data.daysDriven;
    vehicle.milesDriven = data.milesDriven;
    vehicle.vehiclePrimaryUse = data.vehiclePrimaryUse;
    vehicle.annualMileage = data.annualMileage;

    if (!data.id) {
      vehicle.id = gen().toString();
    }

    await client.post(
      `${process.env.DB_SERVICE_URL}/${process.env.COLLECTION_NAME}`,
      vehicle,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return vehicle.id;

  } catch (error) {
    logger.error(
      `app.api.vehicles - error creating new driver - ${JSON.stringify(error)}`
    );
  }
};

module.exports = router;
