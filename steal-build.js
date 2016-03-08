var stealTools = require('steal-tools');

stealTools.export({
	system: {
		config: 'package.json!npm',
		main: 'index'
	},
	options: {
		sourceMaps: true
	},
	outputs: {
		'+cjs': {},
		'+amd': {},
		'+global-js': {}
	}
});
