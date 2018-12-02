"use strict";

import TemplateBuilder from 'builder/template-builder';

class FormBuilder {
  constructor($forms, options) {
    this.options = options;
    this.$forms = $forms;

    this.assocRegexps = this.options.associations.map((assoc) => {
      return new RegExp(`(${assoc}${this.options.postfix}(\\[|\\]\\[|_)?)\\d+`);
    });
    this.destroyRegexps = this.options.associations.map((assoc) => {
      return new RegExp(`${assoc}${this.options.postfix}_\\d+__destroy`);
    });

    this.$template = new TemplateBuilder($forms, options).build();
  }

  add() {
    let $form = this.$template.clone(true, true);
    let newIndex = this.$forms.length + this.options.startIndex;

    this.renewIndex($form, newIndex);

    if (this.options.onBuildForm) {
      this.options.onBuildForm($form, newIndex);
    }

    this.$forms = this.$forms.add($form);

    return [$form, newIndex];
  }

  remove($form) {
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

  removeWith($elem) {
    this.$forms.each((i, form) => {
      let $form = $(form);
      if ($.contains($form.get(0), $elem.get(0))) {
        this.remove($form);
        return;
      }
    });
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
}

export default FormBuilder;
