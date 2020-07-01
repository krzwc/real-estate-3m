const jsonServer = require('json-server')
const originalJSON = require('./scrap3m')
const axios = require('axios')

const TOKEN = 'EfpuXlCvYMNSZ1Vbn5EZB9jfbNbqvvDqToqfqnq7w6Xlys3gKZV8aE8ixOU2S1NEFsA7aXqZEJO8uaGD66s6RsWeY6WX75WJaobU5WUOfgpc-qFDo-7ntHiX7b03UejUnAiw8ZDjLUNn9H2kcZtSZ73bwVAxtIv1VQc52Nz3CDEMHuJiFGV54pt8aElrxzGXfqw3LAKG0RpAQCBIRBmZ96G5kYr52VA5Dv55sqEcu98.'
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


