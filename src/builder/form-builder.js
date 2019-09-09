import $ from 'jquery';
import TemplateBuilder from './template-builder';

export default class FormBuilder {
  constructor($forms, options) {
    this.$forms = $forms;
    this.options = options;

    this.assocRegexps = this.options.associationNames.map((assocName, i) => {
      return new RegExp(`(${assocName}(\\[|\\]\\[|_)?)\\d+`);
    });
    this.destroyRegexps = this.options.associationNames.map((assocName, i) => {
      return new RegExp(`${assocName}_\\d+__destroy`);
    });
  }

  add() {
    let $form = new TemplateBuilder(this.$forms, this.options).build().clone(true, true);
    let newIndex = this.$forms.length + this.options.startIndex;

    this.renewIndex($form, newIndex);

    if (this.options.onBuildForm) {
      this.options.onBuildForm($form, newIndex);
    }

    this.$forms = this.$forms.add($form);

    return [$form, newIndex];
  }

  remove($form) {
    if (this.options.beforeRemoveForm) {
      if (this.options.beforeRemoveForm($form) === false) {
        return;
      }
    }

    $form.hide();
    $form.find('input[id][type=hidden]').each((i, elem) => {
      let $elem = $(elem);
      this.destroyRegexps.forEach((regexp) => {
        if ($elem.attr('id').match(regexp)) {
          $elem.val('1');
        }
      });
    });

    if (this.options.afterRemoveForm) {
      this.options.afterRemoveForm($form);
    }
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
