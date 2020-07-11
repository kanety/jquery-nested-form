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

### Options

`associations` and `postfixes` are available for finding the index of the nested form.
If your nested form consists of multiple associations such as `assocsA` and `assocsB`, you can set the associations as the following example:

```javascript
$().nestedForm({
  associations: ['assocsA', 'assocsB'],
  postfixes: '_attributes'
});
```

`tags` and `attributes` are available to customize the attributes to be replaced:

```javascript
$().nestedForm({
  tags: $.NestedForm.getDefaults().tags.concat(['a']),
  attributes: $.NestedForm.getDefaults().attributes.concat(['onclick'])
});
```

`max` is useful if you want to disable the add button when the number of nested forms reached to the limit:

```javascript
$().nestedForm({
  max: 10
});
```

### Callbacks

Following callbacks are available to manipulate DOM elements:

```javascript
$().nestedForm({
  afterInitialize: function(instance) {},
  onBuildForm: function($form) {},
  beforeAddForm: function($container, $form) {},
  afterAddForm: function($container, $form) {},
  beforeRemoveForm: function($form) {},
  afterRemoveForm: function($form) {}
});
```

### Multi-level nested form

If you have multi-level nested form, use `nestedForm` as follows:

```erb
<%= form_with do |f| %>
  <ul id="container">
    <%= f.fields_for :assocs do |assoc_form| %>
      <li class="nested-form">
        <%= assoc_form.text_field :text %>
        <ul class="deep-container">
          <%= assoc_form.fields_for :assocs2 do |assoc2_form| %>
            <li class="deep-nested-form">
              <%= assoc2_form.text_field :text %>
            </li>
          <% end %>
          <li><button type="button" class="deep-add">Add</button></li>
        </ul>
      </li>
    <% end %>
    <li><button type="button" class="add">Add</button></li>
  </ul>
<% end %>
```

```javascript
$('#container').nestedForm({
  forms: '.nested-form',
  adder: '.add',
  nestedForm: {
    forms: '.deep-nested-form',
    adder: '.deep-add'
  }
});
```

The `nestedForm` option handles same arguments as the first-level form.

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
