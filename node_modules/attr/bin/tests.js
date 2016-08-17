/* global window */

import debug from 'debug';
import '../tests/attr.test';
import '../tests/lib/helpers.test';

window.debug = debug;
debug.enable('attr:*');
