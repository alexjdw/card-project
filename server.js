var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/card-angular-app/dist/card-angular-app')));

// require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000,function(){
    console.log("Listening on port 8000...");
});