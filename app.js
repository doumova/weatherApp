const { query } = require("express");
const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){

    // console.log(req.body.cityName);
    const query=req.body.cityName;
    const apiKey="32dc917006bd91287ccf9628aafdf6cb";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey+ "&units=" + units +"";

    https.get(url, function(response){

    console.log(response.statusCode);
    response.on("data", function(data){

    const weather = JSON.parse(data);
    console.log(weather);
    // trouver la temperature
    const temp = weather.main.temp;
    console.log(temp);
    const description = weather.weather[0].description;
    console.log(description);
    const icon =weather.weather[0].icon;
    console.log(icon);
    const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    res.write("<p>The weather is currently" + description+ " </p>")
    res.write("<h1>temp in " +query+ " is: " + temp+ " degree Celcius.</h1>");
    res.write("<img src="+ imgUrl +">");

    res.send();
    });
});

});




// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });

// });









app.listen(5000, function(){
    console.log("app is running on port 5000.");
});