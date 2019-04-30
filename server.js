'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/location', (request, response) => {
  let query = request.data.query;
  let latLong = convertLatLong(query);
  response.send(latLong);
});

function convertLatLong(query){
  let geoData = require('./data/geo.json');
  let location = {
    search_query: query, 
    formatted_query: geoData.results[0].formatted_query,
    latitudes: geoData.results[0].location.lat,
    longitude: geoData.results[0].location.lng,
  };
  return location;
}

