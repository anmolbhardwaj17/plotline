const express = require("express");
const app = express();
var cors = require('cors')
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({path: './config.env'});

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get("/", (req, res)=> {
    res.send({message:"Plotline assignment", status:200})
})

app.post("/", async (req, res) =>{
    let data = req.body;
    let source = data.source;
    let destination = data.destination;
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&units=imperial&key=${process.env.API_KEY}`,
        headers: { }
      };

      let result;
      let maplink = `https://www.google.com/maps/embed/v1/directions?key=${process.env.API_KEY}&origin=${source}&destination=${destination}&avoid=tolls|highways`;
      
      axios(config)
      .then(function (response) {
        result = response.data;
        let ans = [{
            source: result.origin_addresses[0],
            destination : result.destination_addresses[0],
            distance : result.rows[0].elements[0].distance.text,
            duration : result.rows[0].elements[0].duration.text,
            maplink : maplink
        }]
        res.send({data:ans, status:200});
      })
      .catch(function (error) {
        res.send({error:error, status:500});
      });
    

  });

  app.get("*", (req, res) => {
    res.send({message:`Invalid Url, goto http://localhost:${PORT}`, code:404}); //wrong api calls
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`) 
})