const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Express config pathes
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Express configuration
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static directiory
app.use(express.static(publicDirPath))


//Routing
app.get('', (req, res) =>{
    res.render('index', {
        title: "Weather app",
        name: "Julian"
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:"About",
        name:"Julian",
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: "Help",
        name: "Julian",
    })
})

app.get('/weather', (req, res) =>{
    
    if(req.query.adress === undefined){
        return res.send({
            error:"Please provide location"
        })
    }

    geoCode(req.query.adress, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({err})
        }
        forecast(latitude, longitude, (err, {currentTemperature, fellsLike, description, precipProbability}) => {
            if(err){ 
               return res.send(err)
            }
            res.send({
                location,
                currentTemperature, 
                fellsLike, 
                description,
                precipProbability
            })
        })
    })
})

//404 pages render
app.get('/help/*', (req, res) => {
   res.render('404', {
       title: "404",
       errorMessage: "Help page not found",
       name: "Julian"
   })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found",
        name: "Julian"
    })
})

//Starting a server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
})