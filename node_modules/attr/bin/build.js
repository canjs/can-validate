/* eslint esnext: 0*/
const stealTools = require('steal-tools');

stealTools.export({
    system: {
        config: 'package.json!npm'
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
