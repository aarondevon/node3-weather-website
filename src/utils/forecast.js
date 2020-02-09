const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a4fa6c8eacebaa61c0e2cfd394e3ec3d/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Location not found.', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} out. there is a ${body.currently.precipProbability} chance of rain`)
    }
  });
}

module.exports = forecast

