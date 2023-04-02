import { dbConnectAndExecute } from "../db/index.js";
import { createErrorResponse, createResponse } from "../utils/index.js";
import Vehicle from "../db/models/Vehicle.js";
import errorConstants from "../errors/constants.js";
import MONGO_CONNECTION_STRING from "../env/index.js";

export default async function createVehicle(body, quoteId) {
  const {
    annualMileage,
    daysDriven,
    make,
    model,
    milesDriven,
    vehicleOwned,
    vehiclePrimaryUse,
    vehicleUsage,
    year,
  } = body;

  if (
    !quoteId ||
    !annualMileage ||
    !daysDriven ||
    !make ||
    !model ||
    !milesDriven ||
    !vehicleOwned ||
    !vehiclePrimaryUse ||
    !vehicleUsage ||
    !year
  ) {
    return createErrorResponse(400, errorConstants.commons.badRequest);
  }

  const vehicle = new Vehicle({
    quoteId,
    annualMileage,
    daysDriven,
    make,
    model,
    milesDriven,
    vehicleOwned,
    vehiclePrimaryUse,
    vehicleUsage,
    year,
  });

  const result = await dbConnectAndExecute(MONGO_CONNECTION_STRING, () =>
    vehicle.save()
  );

  if (result) {
    return createResponse(200, {
      message: "Vehicle Created Successfully!!!",
      quoteId,
    });
  } else {
    throw new Error();
  }
}
