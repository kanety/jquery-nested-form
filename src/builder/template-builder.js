import $ from 'jquery';

export default class TemplateBuilder {
  constructor($forms, options) {
    this.options = options;
    this.$forms = $forms;

    this.pkRegexps = this.options.associationNames.map((assocName) => {
      return new RegExp(`${assocName}_\\d+_id$`);
    });
  }

  build() {
    let $template = this.$forms.last().clone(this.options.cloneEvents, this.options.cloneEvents);

    this.removePkFields($template)
    this.initFields($template)
    this.checkFirstRadioButton($template)

    $template.show();

    if (this.options.onBuildTemplate) {
      this.options.onBuildTemplate($template);
    }

    return $template;
  }

  removePkFields($template) {
    $template.find('input[id][type="hidden"]').each((i, elem) => {
      let $elem = $(elem);
      this.pkRegexps.forEach((regexp) => {
        if ($elem.attr('id').match(regexp)) {
          $elem.remove();
        }
      });
    });
  }

  initFields($template) {
    $template.find('textarea, input[type="text"]').val('');
    $template.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
    $template.find('option').removeAttr('selected').prop('selected', false);
    $template.find('input[id$="__destroy"]').removeAttr('value');
  }

  checkFirstRadioButton($template) {
    let names = $template.find('input[name][type="radio"]').map((i, radio) => {
      return $(radio).attr('name');
    }).get().filter((name, pos, arr) => {
      return arr.indexOf(name) == pos;
    });
    names.forEach((name) => {
      let $radios = $template.find(`input[type="radio"][name="${name}"]`);
      if ($radios.filter(':checked').length === 0) {
        $radios.first().prop('checked', true);
      }
    });
  }
}
