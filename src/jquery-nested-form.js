import $ from 'jquery';
import { NAMESPACE } from './consts';
import NestedForm from './nested-form';

$.fn.nestedForm = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new NestedForm($elem, options));
  });  
};

$.NestedForm = NestedForm;
