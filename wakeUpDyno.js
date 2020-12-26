// Get called by Heroku Scheduler

const https = require("https");

const myUrl = "https://haovoanh28.herokuapp.com/";

https.get(myUrl);
