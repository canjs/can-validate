var stealTools = require("steal-tools");

stealTools.export({
	system: {
		config: "package.json!npm",
		ext:{
			stache: "can-validate/stache.js"
		},
	    paths: {
	      "validate.js": "./node_modules/validate.js/validate.js"
	    },
		main: "can-validate.build"
	},
	options: {
		sourceMaps: true
	},
	outputs: {
		"+cjs": {},
		"+amd": {},
		"+global-js": {}
	}
});
