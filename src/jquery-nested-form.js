"use strict";

import NestedForm from 'nested-form';

const NAMESPACE = 'nested-form';

$.fn.nestedForm = function(options) {
  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      let nfc = new NestedForm(this, options);
      $(this).data(NAMESPACE, nfc);
    }
  });  
};

$.nestedForm = {
  setDefaults: NestedForm.setDefaults
};
