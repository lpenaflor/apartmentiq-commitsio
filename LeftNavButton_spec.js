/* globals abodo */
//= require spec_helper
var button, props;

describe("LeftNavButton", function () {
  beforeEach(function () {
    button = abodo.components.LeftNavButton;
    props = {
      label: "MyButton"
    };
  });

  it("Should render successfully", function () {
    assert(
      SpecHelper.getMountedComponent(button, props).find(button).length === 1,
      "Should have one button"
    );
  });

  it("Should render selected successfully", function () {
    props.selected = true;
    assert(
      SpecHelper.getMountedComponent(button, props).find(".selected").length === 1,
      "Should have one selected item"
    );
  });

  it("Should handle click", function () {
    var onClickSpy = sinon.spy();
    props.onClick = onClickSpy;

    SpecHelper.getMountedComponent(button, props).find(".left-nav-button").simulate("click");
    assert(onClickSpy.callCount === 1, "Should have clicked once");
  });
});
