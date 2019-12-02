# jquery-nested-form

A jquery plugin for adding / removing Rails nested form dynamically.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-nested-form --save

## Usage

Build nested form using Rails `fields_for` as usual:

```erb
<%= form_with do |f| %>
  <div id="container">
    <%= f.fields_for :assocs do |assoc_form| %>
      <div class="nested-form">
        <%= assoc_form.text_field :text %>
        <button type="button" class="remove">Remove</button>
      </div>
    <% end %>
    <button type="button" id="add">Add</button>
  </div>
<% end %>
```

Then run:

```javascript
$('#container').nestedForm({
  forms: '.nested-form',
  adder: '#add',
  remover: '.remove',
  associations: 'assocs'
});
```

New nested form is added when the `#add` button is clicked.
The last elements of the `.nested-form` are used as a template to be added.
The index of `id` and `name` attributes are incremented automatically.

```html
<form>
  <div id="container">
    <div class="nested-form">
      <input type="text" name="model[assocs_attributes][0][text]" id="model_assocs_attributes_0_text">
    </div>
    <div class="nested-form">
      <input type="text" name="model[assocs_attributes][1][text]" id="model_assocs_attributes_1_text">
    </div>
    <button type="button" id="add">Add</button>
  </div>
</form>
```

The index is replaced by using the `associations` and `postfixes` options.
If your nested form consists of multiple associations such as `assocsA` and `assocsB`, you can set the associations as the following example:

```javascript
$().nestedForm({
  associations: ['assocsA', 'assocsB'],
  postfixes: '_attributes'
});
```

If you want to customize the attributes to be replaced, `tags` and `attributes` options are available:

```javascript
$().nestedForm({
  tags: $.NestedForm.getDefaults().tags.concat(['a']),
  attributes: $.NestedForm.getDefaults().attributes.concat(['onclick'])
});
```

To disable the add button when the number of nested forms reached to the limit, use `maxIndex` as follows:

```javascript
$().nestedForm({
  maxIndex: 10
});
```

Following callbacks are available to manipulate DOM elements:

```javascript
$().nestedForm({
  afterInitialize: function(instance) {},
  onBuildTemplate: function($template) {},
  onBuildForm: function($form) {},
  beforeAddForm: function($container, $form) {},
  afterAddForm: function($container, $form) {},
  beforeRemoveForm: function($form) {},
  afterRemoveForm: function($form) {}
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
