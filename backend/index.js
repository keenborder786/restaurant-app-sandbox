import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
console.log(process.env.RESTREVIEWS_DB_URI)
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 15,
        wtimeout: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit
}).then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => { console.log(`listening on port ${port}`) })
})




