const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
.options({
    a:{
        demand: true,
        alias: 'address',
        describe: "Address to fetch weather for",
        string: true
    }
})
.help()
.alias('help', 'h')
.version('0.0.1')
.argv;


const encode_address = encodeURI(`${argv.a}`);

const users_location = `http://maps.googleapis.com/maps/api/geocode/json?address=${encode_address}`;



axios.get(`${users_location}`)
.then((response) => {
    if(response.data.status == 'ZERO_RESULTS'){
        throw new Error ('Unable to find that location');
    }

    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;

    let weather_url = `https://api.darksky.net/forecast/9791ab0556802896e5d47576ad995f4c/${lat},${lng}`;

    return axios.get(weather_url);
})
.then((response) => {
        let temp = response.data.currently.temperature;
        let apprentTemp = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temp}. It feels like ${apprentTemp} `);
})
.catch((error) => {
    if(error.code == 'ENOTFOUND'){
        console.log('Unable to connect to API services.');
    }else{
        console.log(error.message);
    }
    
});