const express = require(`express`)
const app = express()
const port = process.env.PORT || 3000
const path = require(`path`)
const request = require(`request`)
const bodyParser = require(`body-parser`)
const apiKey= `eb05140bc7a1279e99ca3e1bcb41b661`

app.set('view engine',`ejs`)
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.render(`main`,{weather:null, error:null})
})

app.post(`/`,(req,res)=>{

    const city = req.body.city;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

    request(url,(error,response,body)=>{
        if(error){
            res.render(`main`,{
                weather:null,
                error:`Not connected to the internet`
            });
        }
        else{
            weather=JSON.parse(body)
            if(weather.location==undefined){
                res.render('main', {weather: null, error: 'No location found, please refresh the page and enter a valid location!'});
            }
            else{
                const message= `It's ${weather.current.temperature} degrees in ${weather.location.name} and the forecast is ${weather.current.weather_descriptions}`
                res.render(`main`, {weather: message, error: null});
            }
        }
    })
})

app.listen(port)


