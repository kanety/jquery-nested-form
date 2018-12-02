# jquery-nested-form

A jquery plugin for adding rails nested form dynamically.

## Dependencies

* jquery

## Usage

Build nested form using rails `fields_for`:

```eruby
<%= form_with do |f| %>
  <div id="container">
    <%= f.fields_for :assocs do |assoc_form| -%>
      <div class="nested-form">
        <%= assoc_form.text_field :text %>
      </div>
    <% end %>
  </div>
  <input type="button" value="Add" id="button">
<% end %>
```

```javascript
$('#container').nestedForm({
  forms: $('#container .nested-form'),
  addBy: $('#button'),
  associations: ['assocs']
});
```

New nested form is added dynamically when clicked the `Add` button.
The last elements of the `.nested-form` are used as a template.
The index of `id` and `name` attributes are incremented automatically as follows:

```html
<form>
  <div id="container">
    <div class="nested-form">
      <input type="text" name="model[assocs_attributes][0][text]" id="model_assocs_attributes_0_text">
    </div>
    <div class="nested-form">
      <input type="text" name="model[assocs_attributes][1][text]" id="model_assocs_attributes_1_text">
    </div>
  </div>
  <input type="button" value="Add" id="button">
</form>
```

### Callback

```javascript
$().nestedForm({
  afterInitialize: function(instance) {},
  onBuildTemplate: function($template) {},
  onBuildForm: function($form) {},
  afterAddForm: function($container, $form) {}
});
```

### Restrict additional count

```javascript
$().nestedForm({
  startIndex: 0,
  maxIndex: 10
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
