const request = require(`request`);

const apiKey = `eb05140bc7a1279e99ca3e1bcb41b661`

const city=`Melbourne`

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

request(url, (error,res,body) =>{
    if(error){
        console.log("error:", {
            error:'Cannot connect to internet'
        })
    }
    else{
        const weather = JSON.parse(body)
        const message= `It's ${weather.current.temperature} degrees in ${weather.location.name} and the forecast is ${weather.current.weather_descriptions}`
        console.log(``,{
            message
        })
    }
})
