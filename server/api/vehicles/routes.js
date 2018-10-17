const express = require('express')
const router = express.Router({mergeParams: true})
const dataStore = require('../../data/dataStore')

let vehicles = [];

router.route('/vehicleInfo/:id/:quoteId')
  .get((req, res, next) => {
    res.send(JSON.stringify(getVehicleInfo(req.params.id, req.params.quoteId)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify({result : saveVehicleInfo(req.body, req.params.quoteId)}))
  })

  let getVehicleInfo = (id, quoteId) => {
    console.log('Returning Vehicle #', id)
    return vehicles.find( x => x.id === id && x.quoteId === quoteId )
  }
  
  let saveVehicleInfo = (data, quoteId) => {
    let vehicle = '';
    if(data.id !== ''){
      vehicle = vehicles.find( x => x.id === data.id);
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
      vehicle.id = vehicles.length + 1
      vehicles.push(vehicle)
    }
    
    dataStore.addVehicle(vehicle)

    return vehicles.length;
  }

module.exports = router;