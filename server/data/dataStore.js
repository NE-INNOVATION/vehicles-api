const mongo = require('mongodb').MongoClient
const collection = process.env.COLLECTION_NAME
const connectionString = process.env.CONNECTION_STRING
const dbName = process.env.DB_NAME
let clientPromise

const createDbConnection = () => {
    if (!clientPromise) {
        clientPromise = getDbConnection()
    }
}

const getDbConnection = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(connectionString, {
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            keepAlive: 1, 
            reconnectTries: 30, 
            reconnectInterval: 2000
        },
            (err, client) => {
                if (err) {
                    console.log('Failed to connect MongoDB')
                    reject(err)
                } else {
                    console.log('Successfully created MongoDB connection')
                    resolve(client)
                }
            })
    })
}

const find = async (quoteId) => {
    let client = await clientPromise
    let db = client.db(dbName)
    let filter = { quoteId: quoteId, type: 'vehicle' }
    return new Promise((resolve, reject) => {
        try {
            db.collection(collection)
                .findOne(filter, async (err, vehicle) => {
                    if (err) {
                        console.log(`Something went wrong - ${err}`)
                        reject()
                    }
                    resolve(vehicle)
                })

        } catch (error) {
            console.log(`Something went wrong, Error - ${error}`)
            reject()
        }
    })
}

const addVehicle = async (vehicleInfo) => {
    let client = await clientPromise
    let db = client.db(dbName)
    let filter = { quoteId: vehicleInfo.quoteId , type: 'vehicle' }
    let objectId, action
    try {
        vehicleInfo.type = 'vehicle'
        let saveResult = await db.collection(collection)
            .replaceOne(filter, vehicleInfo,
                {
                    upsert: true
                })
        objectId = saveResult.insertedId
        action = 'upserted'
    } catch (error) {
        console.log(`Failed to update mongo - QuoteID : ${vehicleInfo.quoteId}`)
    }
    console.log(`vehicle with QuoteID - ${vehicleInfo.quoteId} ${action}`)
    // client.close()
    return objectId
}

module.exports = {
    createDbConnection,
    addVehicle,
    findVehicle: find
}