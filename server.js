var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
var flash = require('express-flash');

app.use(express.static(path.join(__dirname, '/card-angular-app/dist/card-angular-app')));

// require('/server/config/mongoose.js');
// require('/server/config/routes.js')(app);

// this route will be triggered if any of the routes above did not match
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./card-angular-app/dist/card-angular-app/index.html"))
});

app.listen(8000,function(){
    console.log("Listening on port 8000...");
});