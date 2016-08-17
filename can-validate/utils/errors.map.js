import can from 'can';

export default can.Map.extend({}, {
	hasErrors: function () {
		return !can.isEmptyObject(this.attr());
	}
});
