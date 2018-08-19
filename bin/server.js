require('dotenv').config({silent: true})
const {app} = require('../server')

app().listen(process.env.PORT, (err) => {
    if(err){
        console.error('Unable to listen for connections', err)
        process.exit(10)
    }
    console.log(`express ${process.env.NODE_ENV} server is listening on port ${process.env.PORT}`)
})