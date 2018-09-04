const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const app = express();

const port = '8000' || process.env.PORT;

/**
 * configure the body parser middleware for handling
 * json requests and x-www-form-urlencoded
*/

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * connection to the database
*/

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => console.log("You have connected to the database successfully")
    )
    .catch((error)=> {
        console.log(`There was an error ${error}`);
        process.exit();
    });

require('./app/routes/index')(app);

app.listen(port, ()=> {
    console.log(`The app is now running on ${port}`);
});
