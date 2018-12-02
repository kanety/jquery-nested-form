describe('jquery-nested-form', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['test/index.html'];
  });

  it('builds basic form', function() {
    var $container = $('#container');
    var $addBy = $('#add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      addBy: $addBy
    });

    $addBy.click();
    expect($container.find('.nested-form').length).toEqual(2);
    $addBy.click();
    expect($container.find('.nested-form').length).toEqual(3);
  });

  it('builds remobable form', function() {
    var $container = $('#removable_container');
    var $addBy = $('#removable_add');
    var $removeBy = $('.removable-remove');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      addBy: $addBy,
      removeBy: $removeBy
    });

    $addBy.click();
    expect($container.find('.nested-form:visible').length).toEqual(3);
    $container.find('input.removable-remove:last').click();
    expect($container.find('.nested-form:visible').length).toEqual(2);
  });

  it('has callbacks', function() {
    var $container = $('#callback_container');
    var $addBy = $('#callback_add');
    var $afterInitialize = $('#afterInitialize');
    var $onBuildTemplate = $('#onBuildTemplate');
    var $onBuildForm = $('#onBuildForm');
    var $afterAddForm = $('#afterAddForm');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      addBy: $addBy,
      afterInitialize: function(instance) {
        $afterInitialize.text('called afterInitialize');
      },
      onBuildTemplate: function($template) {
        $onBuildTemplate.text('called onBuildTemplate');
      },
      onBuildForm: function($elem) {
        $onBuildForm.text('called onBuildForm');
      },
      afterAddForm: function($container, $elem) {
        $afterAddForm.text('called afterAddForm');
      }
    });

    $addBy.click();
    expect($afterInitialize.text()).toContain('afterInitialize');
    expect($onBuildTemplate.text()).toContain('onBuildTemplate');
    expect($onBuildForm.text()).toContain('onBuildForm');
    expect($afterAddForm.text()).toContain('afterAddForm');
  });

  it('changes index', function() {
    var $container = $('#index_container');
    var $addBy = $('#index_add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      addBy: $addBy,
      increment: 5,
      startIndex: 10,
      maxIndex: 20
    });

    $addBy.click();
    expect($container.find('input[type="text"]').length).toEqual(6);
    $addBy.click();
    expect($container.find('input[type="text"]').length).toEqual(11);
    expect($addBy.attr('disabled')).toEqual('disabled');
  });

  it('specifies associations', function() {
    var $container = $('#specify_container');
    var $addBy = $('#specify_add');
    $container.nestedForm({
      forms: $container.find('.nested-form'),
      addBy: $addBy,
      associations: ['specify']
    });

    $addBy.click();
    expect($('#specify_attributes_1_text').length).toEqual(1);
    expect($('#other_attributes_0_text').length).toEqual(1);
  });
});
