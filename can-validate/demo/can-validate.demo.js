import can from 'can';
import 'can-validate/';
import 'can-validate/shims/validatejs.shim';

import template from './can-validate.demo.stache!';

// Set up a ValidateJS validation object. Can-Validate is just a proxy to the
//  chosen validation library's API.
var validations = {
  myVal: {
    required: true,
    length: {
      minimum: 6
    }
  },
  myNum: {
    required: true,
    numericality: {
      greaterThan: 5
    }
  }
};

// Attach properties to the demo's ViewModel object.
can.$('#demo').append(template({

  // The default value for the first input
  myVal: 'testing testing',

  // The default value for the second input
  myNum: 100,

  // The errors object. We don't need to explicitly set it,
  // can-validate.map plugin will do this for us, but since we rely on it
  // in the UI, we'll create the default empty array.
  errors: [],

  // Handler for validate button.
  // Calls validate method with value and validation ojbect. Updates UI
  //  if any errors were created.
  validateField: function (ctx, $el) {
    var $parent = $el.parents('.input-group'),
      $label = can.$('label[for=' + $parent.find('.form-control').attr('id') + ']'),
      val = $parent.data('field');

    var errors = can.validate.once(this.attr(val), validations[val]);
    if (errors) {
      $parent.addClass('has-error');
      $label.find('.text-danger').text(errors[0]);
    } else {
      $parent.removeClass('has-error');
      $label.find('.text-danger').text('');
    }
  }
}));
