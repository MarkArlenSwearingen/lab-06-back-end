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

app.listen(PORT);
