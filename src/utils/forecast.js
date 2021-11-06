const request = require("request");

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7493c9c159682d38c5a1c26104d13edf&query=`+ encodeURIComponent(lat) + ` ` + encodeURIComponent(lon) + `&units=m`;
    request({url, json:true}, (err, {body}) => {
        if(err){
            callback(`Error: Unable to connect to weather services!`);
        }else if(body.error){
            callback(`Error: Unable to find location!`);
        }else{
            callback(undefined, {
                currentTemperature: body.current.temperature,
                fellsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                precipProbability: body.current.precip,
            })
        }

    })
}
module.exports = forecast;

