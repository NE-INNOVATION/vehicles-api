const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  quoteId: {
    type: String,
    required: true,
  },
  annualMileage: {
    type: String,
    required: true,
  },
  daysDriven: {
    type: String,
    required: true,
  },
  make: {
    type: Number,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  milesDriven: {
    type: String,
    required: true,
  },
  vehicleOwned: {
    type: String,
    required: true,
  },
  vehiclePrimaryUse: {
    type: String,
    required: true,
  },
  vehicleUsage: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

module.exports = Vehicle = mongoose.model("col_lrqi_vehicles", VehicleSchema);
