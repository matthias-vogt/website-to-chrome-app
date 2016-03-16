var express = require('express'),
	path = require('path'),
	hbs = require('hbs'),
	compression = require('compression');

var app = express();

// set app-settings
app.set('context', require('./app-context.js'));

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'atomic' });
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(compression());
app.set("static",
	process.env.NODE_ENV === "production" ? "dist" : "dev"
	// use compressed resources in production
);
app.use(express.static(__dirname + '/' + app.get('static')));

// hbs helpers
require('./hbsHelpers.js')(hbs);

// Routes
require('./routes/routes.js')(express, app);

module.exports = app;
