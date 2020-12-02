const express = require("express");
var rn = require("random-number");
const router = express.Router({ mergeParams: true });
const dataStore = require("../../data/dataStore");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

var gen = rn.generator({
  min: 100000000,
  max: 999999999,
  integer: true,
});

router
  .route("/vehicleInfo/:quoteId/:vehId?")
  .get(async (req, res) => {
    logger.info(
      `app.api.vehicles - getting vehicle with id - ${req.params.vehId}`
    );
    res.send(
      JSON.stringify(await getVehicleInfo(req.params.vehId, req.params.quoteId))
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

let getVehicleInfo = async (vehicleId, quoteId) => {
  try {
    let vehicle = await dataStore.findVehicle(vehicleId, quoteId);
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
    let vehicle = {};
    if (data.vehId) {
      vehicle = await dataStore.findVehicle(data.vehId);
    } else {
      vehicle.quoteId = gen().toString();
      vehicle.id = gen().toString();
    }
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

    await dataStore.addVehicle(vehicle);
    return vehicle.id;

  } catch (error) {
    logger.error(
      `app.api.vehicles - error creating new vehicle - ${JSON.stringify(error)}`
    );
  }
};

module.exports = router;
