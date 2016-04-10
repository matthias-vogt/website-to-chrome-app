var fs = require("fs");

module.exports = function(express, app) {

	app.get('/', function(req, res) {

		var context = app.get('context');

		context.critCss = [{
			code: fs.readFileSync(__dirname + '/../' + app.get('static') + '/css/main.css', 'utf8')
		}];

		context.js = [{
			path: 'lib/FileSaver.min.js'
		}, {
			path: 'lib/jszip.min.js'
		}, {
			path: 'lib/jquery.min.js'
		}, {
			path: 'js/main.js'
		}];

		res.render('index.hbs', context);
	});

};
