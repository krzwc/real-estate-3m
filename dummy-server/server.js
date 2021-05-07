const jsonServer = require('json-server')
const originalJSON = require('./scrap3m')
const axios = require('axios')

const TOKEN = 'AAPKb26a5eadcfac4857a915149114837d5eWYMZ_3IyRYSTrHoXxvHPajJH46LrjTiovc9azU06Wbj8mWmQAKCHzHEdQU3HPLke'
const addressArr = originalJSON.data.map((ad) => ad.loc)
const addressObj = {
    "records": addressArr.map((address, index) => ({
        "attributes": {
            "OBJECTID": index + 1,
            "SingleLine": address
        }
    }))
}

const URL = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses=${encodeURIComponent(JSON.stringify(addressObj))}&f=pjson&token=${TOKEN}`

const geocode = () => {
    try {
        axios.get(URL)
            .then(result => {
                const geocodedJSON = {
                    "data": originalJSON.data.map((ad, index) => ({
                        ...ad,
                        lon: result.data.locations[index].attributes.X,
                        lat: result.data.locations[index].attributes.Y
                    }))
                }
                const server = jsonServer.create()
                const router = jsonServer.router(geocodedJSON)
                const middlewares = jsonServer.defaults()
                const port = process.env.PORT || 4000;

                server.use(middlewares)
                server.use(router)
                server.listen(port, () => {
                    console.log('JSON Server is running')
                })
            })
            .catch(err => console.error(err));
    } catch (err) {
        console.error('GG', err);
    }
};

geocode()


