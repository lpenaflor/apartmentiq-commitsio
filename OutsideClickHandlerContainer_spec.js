/* globals abodo */
//= require spec_helper

describe("OutsideClickHandlerContainer", function () {

  it("Should not handle callback click", function () {
    var onClickOutsideSpy = sinon.spy();
    var props = {
      onOutsideClick: onClickOutsideSpy
    };
    var OutsideClickHandler = abodo.components.OutsideClickHandlerContainer;

    SpecHelper.getMountedComponent(OutsideClickHandler, props).find('[id="defaultRootNode"]').simulate("click");
    assert(onClickOutsideSpy.callCount === 0, "Should not have fired click callback");
  });

  it("Should handle callback click", function () {
    var onClickOutsideSpy = sinon.spy();
    var props = {
      onOutsideClick: onClickOutsideSpy
    };

    var OutsideClickHandler = abodo.components.OutsideClickHandlerContainer;
    SpecHelper.getMountedComponent(OutsideClickHandler, props);

    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    SpecHelper.getRootElement().dispatchEvent(evt);

    assert(onClickOutsideSpy.callCount === 1, "Should have fired click callback");
  });
});
