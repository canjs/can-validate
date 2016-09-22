/* jshint asi: false */
import Map from 'can-map';
import 'can-map-define';
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

var validatedMap = new ValidatedMap();

validatedMap.attr('myNumber', null);
