# CHANGELOG

## 0.6.0

* Support multi-level nested form by `nestedForm` option.
* Remove `onBuildTemplate` callback. Use `onBuildForm` instead.
* Change `maxIndex` to `max`. `max` means the number of forms.
* Use latest form html as template. Don't use cached html at the time of initialization.
* Refactoring.

## 0.5.1

* Find adder element in container first.

## 0.5.0

* Add addTo option.
* Add a new form after the last form instead of the bottom of container.

## 0.4.1

* Fix jquery deprecated selector.

## 0.4.0

* Find nested form in container.
* Build template on demand.

## 0.3.0

* Remove selected attribute from option tag when added a nested form.
* Capitalize global class. Use $.NestedForm instead of $.nestedForm.
* Destroy existing instance on initialization.
* Refactoring.

## 0.2.0

* Export class for convenience.
* Fix error raised if remover option is null.
* Refactoring.

## 0.1.0

* First release.
