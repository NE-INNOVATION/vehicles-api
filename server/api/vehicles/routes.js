const express = require('express')
const router = express.Router({mergeParams: true})

router.route('/vehicleInfo')
  .get((req, res, next) => {
    res.send(JSON.stringify({"make":"A","model":"B","year":2019}))
  })
  .post((req, res, next) => {
    res.send('data saved')
  })

module.exports = router;