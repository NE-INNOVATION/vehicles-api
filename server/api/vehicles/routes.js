const express = require('express')
const router = express.Router({mergeParams: true})

let vehicles = [];

router.route('/vehicleInfo/:id/:quoteid')
  .get((req, res, next) => {
    res.send(JSON.stringify(getVehicleInfo(req.params.id, request.params.quoteid)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify({result : saveVehicleInfo(req.body)}))
  })

  let getVehicleInfo = (id, quoteid) => {
    console.log('Returning Vehicle #', id)
    return vehicles.find( x => x.id === id && x.quoteid === quoteid )
  }
  
  let saveVehicleInfo = (data) => {
    let vehicle = '';
    if(data.id !== ''){
      vehicle = vehicles.find( x => x.id === data.id && x.quoteid === data.quoteid);
    }else{
      vehicle = {};
    }
    
    vehicle.quoteid = data.quoteid
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
  
    return vehicles.length;
  }

module.exports = router;