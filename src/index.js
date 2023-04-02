import { createErrorResponse } from "./utils/index.js";
import errorConstants from "./errors/constants.js";
import createVehicle from "./handlers/vehicle.js";

export async function handler(event) {
  try {
    const { path, method } = event.requestContext.http;

    if (path.startsWith("/api/vehicles/vehicleInfo")) {
      if (method.toLowerCase() === "post") {
        return await createVehicle(
          JSON.parse(event.body),
          event?.pathParameters?.quoteId
        );
      }
    }
  } catch (err) {
    return createErrorResponse(500, errorConstants.commons.internalServerError);
  }
}
