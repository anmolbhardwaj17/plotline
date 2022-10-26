const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({path: './config.env'});

var config = {
  method: 'get',
  url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=${process.env.API_KEY}`,
  headers: { }
};
console.log("apikey", process.env.API_KEY)

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});