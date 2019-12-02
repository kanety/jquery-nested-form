describe('jquery-nested-form', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
    eval($('script').text());
  });

  it('builds basic form', () => {
    let $container = $('#container');
    let $adder = $('#add');

    $adder.click();
    expect($container.find('.nested-form').length).toEqual(2);
    $adder.click();
    expect($container.find('.nested-form').length).toEqual(3);
  });

  it('builds remobable form', () => {
    let $container = $('#removable_container');
    let $adder = $('#removable_add');

    $adder.click();
    expect($container.find('.nested-form:visible').length).toEqual(3);
    $container.find('.removable-remove').last().click();
    expect($container.find('.nested-form:visible').length).toEqual(2);
  });

  it('has callbacks', () => {
    let $container = $('#callback_container');
    let $adder = $('#callback_add');
    let $message = $('#message');

    expect($message.text()).toContain('afterInitialize');

    $adder.click();
    expect($message.text()).toContain('onBuildTemplate');
    expect($message.text()).toContain('onBuildForm');
    expect($message.text()).toContain('beforeAddForm');
    expect($message.text()).toContain('afterAddForm');

    $('.callback-remove').last().click();
    expect($message.text()).toContain('beforeRemoveForm');
    expect($message.text()).toContain('afterRemoveForm');
  });

  it('Customizes start index', () => {
    let $container = $('#index_container');
    let $adder = $('#index_add');

    $adder.click();
    expect($container.find('input[type="text"]').length).toEqual(4);
    $adder.click();
    expect($container.find('input[type="text"]').length).toEqual(6);
    expect($adder.attr('disabled')).toEqual('disabled');
  });

  it('has multiple associations', () => {
    let $container = $('#multiple_container');
    let $adder = $('#multiple_add');

    $adder.click();
    expect($('#some_attributes_1_text').length).toEqual(1);
    expect($('#other_attributes_1_text').length).toEqual(1);
  });

  it('adds a form as first position', () => {
    let $container = $('#first_container');
    let $adder = $('#first_add');

    $adder.click();
    expect($container.find('.nested-form input').first().attr('id')).toEqual('first_attributes_1_text');
  });
});
