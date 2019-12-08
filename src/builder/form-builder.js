import $ from 'jquery';
import TemplateBuilder from './template-builder';

export default class FormBuilder {
  constructor(options) {
    this.options = options;

    this.assocRegexps = this.options.assocs.map((assoc, i) => {
      return new RegExp(`(${assoc}(\\[|\\]\\[|_)?)\\d+`);
    });
    this.destroyRegexps = this.options.assocs.map((assoc, i) => {
      return new RegExp(`${assoc}_\\d+__destroy`);
    });
  }

  build($forms) {
    let $form = new TemplateBuilder(this.options).build($forms.last());
    $form.show();

    let newIndex = $forms.length + this.options.startIndex;
    this.renewIndex($form, newIndex);

    return [$form, newIndex];
  }

  renewIndex($form, newIndex) {
    let selector = this.options.tags.join(', ');
    $form.find(selector).each((i, elem) => {
      let $elem = $(elem);
      this.options.attributes.forEach((attr) => {
        let value = $elem.attr(attr);
        if (!value) {
          return;
        }
        this.assocRegexps.forEach((regexp) => {
          value = value.replace(regexp, '$1' + newIndex);
        });
        $elem.attr(attr, value);
      });
    });
  }

  destroy($form) {
    $form.hide();

    $form.find('input[id][type=hidden]').each((i, elem) => {
      let $elem = $(elem);
      this.destroyRegexps.forEach((regexp) => {
        if ($elem.attr('id').match(regexp)) {
          $elem.val('1');
        }
      });
    });
  }
}
