import { NAMESPACE } from './consts';
import NestedForm from './nested-form';

$.fn.nestedForm = function(options) {
  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      let nfc = new NestedForm(this, options);
      $(this).data(NAMESPACE, nfc);
    }
  });  
};

$.NestedForm = NestedForm;
