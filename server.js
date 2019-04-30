'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/location', (request, response) => {
  let locationData = request.query.data;
  let latLong = convertLatLong(locationData);
  response.send(latLong);
});

function convertLatLong(query){
  let geoData = require('./data/geo.json');
  let location = {
    search_query: query,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.results[0].geometry.location.lng,
  };
  return location;
}

app.get('/weather', (request, response) =>{
  let weather = getWeather(request.query.latitude, request.query.longitude);
  return weather;
});

function getWeather(lat, lng){
  let darksky = require('./data/darksky.json');
  let result = [];

  darksky.daily.data.forEach(object => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let month = ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(object.time);
    let time = [days[date.getDay()], month[date.getMonth()], date.getDate(), date.getFullYear()].join(' ');

    result.push({forecast: object.summary, time: time});
  });
  
  return result;
}

app.listen(PORT);
