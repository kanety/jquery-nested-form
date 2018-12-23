describe('jquery-nested-form', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('builds basic form', function() {
    var $container = $('#container');
    var $adder = $('#add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      adder: $adder
    });

    $adder.click();
    expect($container.find('.nested-form').length).toEqual(2);
    $adder.click();
    expect($container.find('.nested-form').length).toEqual(3);
  });

  it('builds remobable form', function() {
    var $container = $('#removable_container');
    var $adder = $('#removable_add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      adder: $adder,
      remover: '.removable-remove'
    });

    $adder.click();
    expect($container.find('.nested-form:visible').length).toEqual(3);
    $container.find('input.removable-remove:last').click();
    expect($container.find('.nested-form:visible').length).toEqual(2);
  });

  it('has callbacks', function() {
    var $container = $('#callback_container');
    var $adder = $('#callback_add');
    var $message = $('#message');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      adder: $adder,
      remover: '.callback-remove',
      afterInitialize: function(instance) {
        $message.append('afterInitialize');
      },
      onBuildTemplate: function($template) {
        $message.append('onBuildTemplate');
      },
      onBuildForm: function($elem) {
        $message.append('onBuildForm');
      },
      beforeAddForm: function($container, $elem) {
        $message.append('beforeAddForm');
      },
      afterAddForm: function($container, $elem) {
        $message.append('afterAddForm');
      },
      beforeRemoveForm: function($container, $elem) {
        $message.append('beforeRemoveForm');
      },
      afterRemoveForm: function($container, $elem) {
        $message.append('afterRemoveForm');
      }
    });

    expect($message.text()).toContain('afterInitialize');
    expect($message.text()).toContain('onBuildTemplate');

    $adder.click();
    expect($message.text()).toContain('onBuildForm');
    expect($message.text()).toContain('beforeAddForm');
    expect($message.text()).toContain('afterAddForm');

    $('.callback-remove:last').click();
    expect($message.text()).toContain('beforeRemoveForm');
    expect($message.text()).toContain('afterRemoveForm');
  });

  it('Customizes start index', function() {
    var $container = $('#index_container');
    var $adder = $('#index_add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      adder: $adder,
      increment: 3,
      startIndex: 10,
      maxIndex: 15
    });

    $adder.click();
    expect($container.find('input[type="text"]').length).toEqual(4);
    $adder.click();
    expect($container.find('input[type="text"]').length).toEqual(6);
    expect($adder.attr('disabled')).toEqual('disabled');
  });

  it('has multiple associations', function() {
    var $container = $('#multiple_container');
    var $adder = $('#multiple_add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      adder: $adder,
      associations: ['some', 'other']
    });

    $adder.click();
    expect($('#some_attributes_1_text').length).toEqual(1);
    expect($('#other_attributes_1_text').length).toEqual(1);
  });
});
