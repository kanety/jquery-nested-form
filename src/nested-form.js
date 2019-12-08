import $ from 'jquery';
import { NAMESPACE } from './consts';
import FormBuilder from './builder/form-builder';

const DEFAULTS = {
  forms: '',
  adder: '',
  remover: null,
  associations: '',
  postfixes: '_attributes',
  increment: 1,
  max: null,
  startIndex: 0,
  tags: ['input', 'textarea', 'select', 'label'],
  attributes: ['id', 'name', 'for'],
  cloneEvents: true,
  addTo: 'last',
  nestedForm: null,
  // callbacks
  afterInitialize: null,
  onBuildForm: null,
  beforeAddForm: null,
  afterAddForm: null,
  beforeRemoveForm: null,
  afterRemoveForm: null
};

export default class NestedForm {
  constructor(container, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);
    this.options.assocs = this.makeAssocs();

    this.$container = $(container);
    this.$adder = this.adder();

    this.builder = new FormBuilder(this.options);

    this.bind();

    if (this.options.afterInitialize) {
      this.options.afterInitialize(this);
    }

    if (this.options.nestedForm) {
      this.forms().each((i, form) => {
        $(form).nestedForm(this.options.nestedForm);
      });
    }
  }

  destroy() {
    this.unbind();
  }

  bind() {
    this.$adder.on(`click.${NAMESPACE}`, (e) => {
      e.preventDefault();
      this.addForms();
    });

    if (this.options.remover) {
      this.$container.on(`click.${NAMESPACE}`, this.options.remover, (e) => {
        e.preventDefault();
        this.removeWith($(e.currentTarget));
      });
    }
  }

  unbind() {
    this.$adder.off(`.${NAMESPACE}`);
    this.$container.off(`.${NAMESPACE}`);
  }

  adder() {
    if (this.$container.find(this.options.adder).length) {
      return this.$container.find(this.options.adder);
    } else {
      return $(this.options.adder);
    }
  }

  forms() {
    return this.$container.find(this.options.forms);
  }

  addForms() {
    for (let n=0; n<this.options.increment; n++) {
      if (this.add() === false) break;
    }
  }

  add() {
    let [$form, newIndex] = this.builder.build(this.forms());

    if (this.options.onBuildForm) {
      this.options.onBuildForm($form, newIndex);
    }

    if (this.options.beforeAddForm) {
      if (this.options.beforeAddForm(this.$container, $form, newIndex) === false) {
        return false;
      }
    }

    if (this.options.addTo == 'first') {
      this.forms().first().before($form);
    } else {
      this.forms().last().after($form);
    }

    if (this.options.afterAddForm) {
      this.options.afterAddForm(this.$container, $form, newIndex);
    }

    if (this.options.nestedForm) {
      $form.nestedForm(this.options.nestedForm);
    }

    return this.refresh();
  }

  removeWith($remover) {
    this.forms().each((i, form) => {
      let $form = $(form);
      if ($.contains($form.get(0), $remover.get(0))) {
        this.remove($form);
        return;
      }
    });
  }

  remove($form) {
    if (this.options.beforeRemoveForm) {
      if (this.options.beforeRemoveForm($form) === false) {
        return;
      }
    }

    this.builder.destroy($form);

    if (this.options.afterRemoveForm) {
      this.options.afterRemoveForm($form);
    }

    this.refresh();
  }

  refresh() {
    if (this.options.max && this.forms().filter(':visible').length >= this.options.max) {
      this.disable();
      return false;
    } else {
      this.enable();
      return true;
    }
  }

  enable() {
    this.$adder.prop('disabled', false);
  }

  disable() {
    this.$adder.prop('disabled', true);
  }

  makeAssocs() {
    let associations = [].concat(this.options.associations);
    let postfixes = [].concat(this.options.postfixes);
    return associations.map((assoc, i) => {
      let postfix = postfixes[i] || postfixes[0];
      return `${assoc}${postfix}`;
    });
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(DEFAULTS, options);
  }
}
