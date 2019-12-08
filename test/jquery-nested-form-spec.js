describe('jquery-nested-form', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic form', () => {
    it('builds basic form', () => {
      let $container = $('#container');
      let $adder = $('#add');

      $adder.click();
      expect($container.find('.nested-form').length).toEqual(2);
      $adder.click();
      expect($container.find('.nested-form').length).toEqual(3);
    });
  });

  describe('removable form', () => {
    it('builds removable form', () => {
      let $container = $('#removable_container');
      let $adder = $('#removable_add');

      $adder.click();
      expect($container.find('.nested-form:visible').length).toEqual(3);
      $container.find('.removable-remove').last().click();
      expect($container.find('.nested-form:visible').length).toEqual(2);
    });
  });

  describe('callbacks', () => {
    it('executes callbacks', () => {
      let $container = $('#callback_container');
      let $adder = $('#callback_add');
      let $message = $('#message');

      expect($message.text()).toContain('afterInitialize');

      $adder.click();
      expect($message.text()).toContain('onBuildForm');
      expect($message.text()).toContain('beforeAddForm');
      expect($message.text()).toContain('afterAddForm');

      $('.callback-remove').last().click();
      expect($message.text()).toContain('beforeRemoveForm');
      expect($message.text()).toContain('afterRemoveForm');
    });
  });

  describe('startIndex and maxIndex', () => {
    it('sets startIndex and maxIndex', () => {
      let $container = $('#index_container');
      let $adder = $('#index_add');

      $adder.click();
      expect($container.find('input[type="text"]').length).toEqual(4);
      $adder.click();
      expect($container.find('input[type="text"]').length).toEqual(6);
      expect($adder.attr('disabled')).toEqual('disabled');
    });
  });

  describe('multiple associations', () => {
    it('adds a form with multiple associations', () => {
      let $container = $('#multiple_container');
      let $adder = $('#multiple_add');

      $adder.click();
      expect($('#some_attributes_1_text').length).toEqual(1);
      expect($('#other_attributes_1_text').length).toEqual(1);
    });
  });

  describe('addTo', () => {
    it('adds a form at first position', () => {
      let $container = $('#first_container');
      let $adder = $('#first_add');

      $adder.click();
      expect($container.find('.nested-form input').first().attr('id')).toEqual('first_attributes_1_text');
    });
  });

  describe('complex form', () => {
    it('adds a multi-level nested form', () => {
      let $container = $('#complex_container');
      let $adder = $('#complex_add');

      $adder.click();
      expect($container.find('.nested-form').length).toEqual(2);

      let $lastForm = $container.find('.nested-form').last()
      $lastForm.find('.deep-add').click();
      expect($lastForm.find('.deep-nested-form').length).toEqual(2);

      let $lastDeepForm = $lastForm.find('.deep-nested-form').last()
      $lastDeepForm.find('.more-deep-add').click();
      expect($lastDeepForm.find('.more-deep-nested-form').length).toEqual(3);
    });
  });

  describe('destroy', () => {
    it('destroys existing instance', () => {
      eval($('script').text());

      let $container = $('#container');
      $container.data('nested-form').destroy();
      expect($._data($container[0], "events")).toEqual(undefined);
    });
  });
});
