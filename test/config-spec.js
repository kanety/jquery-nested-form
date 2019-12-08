describe('jquery-nested-form', () => {
  it('config', () => {
    let defaults = $.NestedForm.getDefaults();
    expect(defaults.test).toEqual(undefined);

    defaults = $.NestedForm.setDefaults({test: 999});
    expect(defaults.test).toEqual(999);
  });
});
