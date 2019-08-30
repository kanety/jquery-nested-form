describe('jquery-nested-form', () => {
  it('config', () => {
    let defaults = $.NestedForm.getDefaults();
    expect(defaults.maxIndex).toEqual(null);

    defaults = $.NestedForm.setDefaults({maxIndex: 999});
    expect(defaults.maxIndex).toEqual(999);
  });
});
