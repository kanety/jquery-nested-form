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
  startIndex: 0,
  maxIndex: null,
  tags: ['input', 'textarea', 'select', 'label'],
  attributes: ['id', 'name', 'for'],
  cloneEvents: true,
  addTo: 'last',
  // callbacks
  afterInitialize: null,
  onBuildTemplate: null,
  onBuildForm: null,
  beforeAddForm: null,
  afterAddForm: null,
  beforeRemoveForm: null,
  afterRemoveForm: null
};

export default class NestedForm {
  constructor(container, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);
    this.options.associationNames = this.makeAssociationNames();

    this.$container = $(container);
    if (this.$container.find(this.options.adder).length) {
      this.$adder = this.$container.find(this.options.adder);
    } else {
      this.$adder = $(this.options.adder);
    }

    this.bind();

    this.builder = new FormBuilder(this.forms(), this.options)

    if (this.options.afterInitialize) {
      this.options.afterInitialize(this);
    }
  }

  destroy() {
    this.unbind();
  }

  bind() {
    this.$adder.on(`click.${NAMESPACE}`, (e) => {
      e.preventDefault();
      this.add();
    });

    if (this.options.remover) {
      this.$container.on(`click.${NAMESPACE}`, this.options.remover, (e) => {
        e.preventDefault();
        this.remove($(e.currentTarget));
      });
    }
  }

  unbind() {
    this.$adder.off(`.${NAMESPACE}`);
    this.$container.off(`.${NAMESPACE}`);
  }

  forms() {
    return this.$container.find(this.options.forms);
  }

  add() {
    for (let n=0; n<this.options.increment; n++) {
      let [$form, newIndex] = this.builder.add();

      if (this.options.beforeAddForm) {
        if (this.options.beforeAddForm(this.$container, $form, newIndex) === false) {
          break;
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
    this.$adder.prop('disabled', false);
  }

  disable() {
    this.$adder.prop('disabled', true);
  }

  makeAssociationNames() {
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
