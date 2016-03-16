var fs = require('fs');
require.extensions['.template'] = function(module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = {
	title: 'Chrome App Generator',
	description: 'Use websites like native apps',
	authorLink: 'https://github.com/matthias-vogt',
	projectLink: 'https://github.com/matthias-vogt/website-to-chrome-app',
	sourceNotice: 'Source available on GitHub:', //this should be done with a function
	template: {
		background: require('./src/chrome app template/background.js.template'),
		manifest: require('./src/chrome app template/manifest.json.template'),
		window: require('./src/chrome app template/window.html.template'),
	}
}