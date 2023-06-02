const express = require('express');
const app = express();
const  mongoose  = require('./db/mongoose')
const bodyParser = require('body-parser');
const cors=require('cors');


//Load in Foods Routes
const foodRouter=require('./routes/foodRoutes')
//Load in Exercises Routes
const exercisesRouter=require('./routes/exercisesRoutes')
//Load in Recipes Routes
const recipesRouter=require('./routes/recipesRoutes')
//Load in Weightgain Routes
const weightgainRouter=require('./routes/weightgainRoutes')
//Load in weightloss Routes
const weightlossRouter=require('./routes/weightlossRoutes')

//Loading middleware
app.use(bodyParser.json());

//CORs header middleware
app.use(function(req, res, next) {
   // headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*",); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods" ,"*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



// Routes 
app.use(foodRouter);
app.use(exercisesRouter);
app.use(recipesRouter);
app.use(weightgainRouter);
app.use(weightlossRouter);


// //Running fitbizz app using nodejs on port 3000
// app.use(express.static('fitbizz'));


//Setting Port for Backend
const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on port 3000")
})



