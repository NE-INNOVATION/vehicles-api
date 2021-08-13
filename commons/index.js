const Vehicle = require("../server/models/Vehicle");

module.exports = {
  saveVehicle: async (body) => {
    const {
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
    } = body;

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

    await vehicle.save();

    return quoteId;
  },
};
