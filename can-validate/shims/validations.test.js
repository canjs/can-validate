/* jshint asi: false */
import canMap from 'can-map';
import 'can-map-define';
import 'can-validate/map/validate/validate';
import 'steal-qunit';

var ValidatedMap = canMap.extend({
	define: {
		myNumber: {
			value: 100,
			validate: {
				presence: true
			}
		}
	}
});

var validatedMap = new ValidatedMap();

validatedMap.attr('myNumber', null);
