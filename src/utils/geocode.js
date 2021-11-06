const request = require("request");

const geoCode  = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoidXNlcm5hbWUxNjE2MzIiLCJhIjoiY2t2MHMyNWtjMDl4eTJ2b3ZqMXlyamVxaSJ9.HsT1QIUnByNTmf5Un_XR7g&limit=1`;

    request({url, json:true}, (err, {body}) => {
        if(err){
             callback(`Error: Unable to connect to geo services!`);
        }else if(body.message === "Not Found"){
            callback("Provide data please!")
        }else if (body.features.length === 0){
              callback(`Error: Unable to find location!`);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;