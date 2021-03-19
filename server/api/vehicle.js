const express = require("express");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Vehicle = require("../models/Vehicle");

// @route   GET api/vehicles/vehicleInfo/:quoteId
// @desc    Get Vehicle
// @access  Private
router.get("/vehicles/vehicleInfo/:quoteId", async (req, res) => {
  try {
    res.json({});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/vehicles/vehicleInfo/:quoteId
// @desc    Create or update a vehicle
// @access  Private
router.post(
  "/vehicles/vehicleInfo/:quoteId",
  [
    [
      check("annualMileage", "Annual Mileage is required").not().isEmpty(),
      check("make", "Make is required").not().isEmpty(),
      check("model", "Model is required").not().isEmpty(),
      check("quoteId", "QuoteId is required").not().isEmpty(),
      check("vehicleOwned", "Vehicle Owned is required").not().isEmpty(),
      check("vehicleUsage", "Vehicle Usage is required").not().isEmpty(),
      check("year", "Year is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    } = req.body;

    try {
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

      res.json({ quoteId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/vehicles/vehicleInfo/:id?
// @desc    Delete vehicle by Id
// @access  Private
router.delete("/vehicles/vehicleInfo/:id?", async (req, res) => {
  try {
    res.json({ msg: "Vehicle deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
