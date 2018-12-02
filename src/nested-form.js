"use strict";

import FormBuilder from 'builder/form-builder';

const NAMESPACE = 'nested-form';
const DEFAULTS = {
  forms: $(),
  addBy: $(),
  removeBy: $(),
  associations: [''],
  increment: 1,
  startIndex: 0,
  maxIndex: null,
  tags: ['input', 'textarea', 'select', 'label'],
  attributes: ['id', 'name', 'for'],
  postfix: '_attributes',
  cloneEvents: true,
  // callbacks
  afterInitialize: null,
  onBuildTemplate: null,
  onBuildForm: null,
  afterAddForm: null
};

class NestedForm {
  constructor(container, options) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$container = $(container);
    this.$addBy = $(this.options.addBy);
    this.$removeBy = $(this.options.removeBy);

    this.bind();

    this.builder = new FormBuilder($(this.options.forms), this.options)

    if (this.options.afterInitialize) {
      this.options.afterInitialize(this);
    }
  }

  bind() {
    this.$addBy.on(`click.${NAMESPACE}`, (e) => {
      e.preventDefault();
      this.add();
    });
    this.$removeBy.on(`click.${NAMESPACE}`, (e) => {
      e.preventDefault();
      this.remove($(e.currentTarget));
    });
  }

  unbind() {
    this.$addBy.off(`click.${NAMESPACE}`);
    this.$removeBy.off(`click.${NAMESPACE}`);
  }

  add() {
    for (let n=0; n<this.options.increment; n++) {
      let [$form, newIndex] = this.builder.add();

      this.$container.append($form);

      if (this.options.afterAddForm) {
        this.options.afterAddForm(this.$container, $form);
      }

      if (this.options.maxIndex && newIndex >= this.options.maxIndex) {
        this.disable();
        break;
      }
    }
  }

  remove($elem) {
    this.builder.removeWith($elem);
  }

  enable() {
    this.$addBy.prop('disabled', false);
  }

  disable() {
    this.$addBy.prop('disabled', true);
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, options);
  }
}

export default NestedForm;
