import $ from 'jquery';

export default class TemplateBuilder {
  constructor(options) {
    this.options = options;

    this.pkRegexps = this.options.assocs.map((assoc) => {
      return new RegExp(`${assoc}_\\d+_id$`);
    });
  }

  build($form) {
    let $template = $form.clone(this.options.cloneEvents, this.options.cloneEvents);

    this.removePk($template);
    this.initFields($template);
    this.checkRadio($template);

    return $template;
  }

  removePk($template) {
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

  checkRadio($template) {
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
