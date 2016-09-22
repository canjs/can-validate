/* jshint asi: false */
import Map from 'can-map';
import 'can-validate/map/validate/validate';
import 'steal-qunit';

var ValidatedMap = Map.extend({
	define: {
		myNumber: {
			value: 100,
			validate: {
				presence: true
			}
		}
	}
});

var test = new ValidatedMap();

test.attr('myNumber', null);
