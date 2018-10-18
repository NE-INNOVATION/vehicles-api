const express = require('express')
var rn = require('random-number');
const router = express.Router({mergeParams: true})
const dataStore = require('../../data/dataStore')

var gen = rn.generator({
  min:  100000000
, max:  999999999
, integer: true
})

router.route('/vehicleInfo/:id/:quoteId')
  .get(async (req, res, next) => {
    res.send(JSON.stringify(await getVehicleInfo(req.params.id, req.params.quoteId)))
  })
  .post(async (req, res, next) => {
    res.send(JSON.stringify({result : await saveVehicleInfo(req.body, req.params.quoteId)}))
  })

  let getVehicleInfo = async (id, quoteId) => {
    console.log('Returning Vehicle #', id)
    let vehicle = await dataStore.findVehicle(quoteId)
    return vehicle
  }
  
  let saveVehicleInfo = async (data, quoteId) => {
    let vehicle = '';
    if(data.id !== ''){
      vehicle = await dataStore.findVehicle(quoteId);
    }else{
      vehicle = {};
      vehicle.quoteId = quoteId
    }
    
    vehicle.year = data.year
    vehicle.make = data.make
    vehicle.model = data.model
    vehicle.vehicleOwned = data.vehicleOwned
    vehicle.vehicleUsage = data.vehicleUsage
    vehicle.daysDriven = data.daysDriven
    vehicle.milesDriven = data.milesDriven
    vehicle.vehiclePrimaryUse = data.vehiclePrimaryUse
    vehicle.annualMileage = data.annualMileage
    
    if(data.id === '') {
      vehicle.id = gen().toString()
    }
    
    dataStore.addVehicle(vehicle)

    return vehicle.id
  }

module.exports = router;