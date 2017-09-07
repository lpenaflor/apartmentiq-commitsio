/* globals abodo, expect */
//= require spec_helper
var header, props;

describe("LeftNavCategoryHeading", function () {
  beforeEach(function () {
    header = abodo.components.LeftNavCategoryHeading;
    props = {
      clickable: false,
    };
  });

  it("Should Render Successfully", function () {
    var comp = SpecHelper.getMountedComponent(header, props);
    assert(comp.find(header).text() === "", "Should Render without an empty label");

    props.label = "Test Label";
    var comp2 = SpecHelper.getMountedComponent(header, props);
    assert(comp2.find(header).length === 1, "Should Render one");
    assert(comp2.find(header).text() === "Test Label", "Should have the same label");
  });

  it("Should fail to initialize", function () {
    props.clickable = true;
    props.filterable = true;

    expect(React.createElement(header, props)).to.throw;
  });

  it("should click on category header to display LeftNavTextInput for interactivity", function () {
    var LeftNavTextInput = abodo.components.LeftNavTextInput;
    var onEnter = sinon.spy();

    var navProps = {
      clickable: true,
      label: "CategoryLabel",
      onAdded: onEnter
    };

    var wrapper = SpecHelper.getMountedComponent(header, navProps);
    wrapper.find(".left-nav-category").simulate("click");
    assert(wrapper.find(LeftNavTextInput).length === 1, "Should have one text input");

    // simulate pressing enter
    var evt = document.createEvent("Events");
    evt.initEvent("keydown", true, true);
    evt.keyCode = 13;
    evt.which = 13;
    document.getElementById("heading-CategoryLabel").dispatchEvent(evt);

    assert(onEnter.callCount === 1, "Should have one call count of 1");
    assert(wrapper.find(LeftNavTextInput).length === 0, "Should not have a text input");
  });

  it("should not be able to click on category header", function () {
    var LeftNavTextInput = abodo.components.LeftNavTextInput;
    var headerProps = {
      clickable: false,
      label: "CategoryLabel"
    };

    var wrapper = SpecHelper.getMountedComponent(header, headerProps);
    wrapper.find(".left-nav-category").simulate("click");
    assert(wrapper.find(LeftNavTextInput).length === 0, "Should not have a text input");
  });

  it("Should render for search filterable", function () {
    var headerProps = {
      clickable: false,
      filterable: true,
      label: "My Properties"
    };

    var wrapper = SpecHelper.getMountedComponent(header, headerProps);
    assert(wrapper.find(".left-nav-fa-search").nodes.length === 1, "Should be search mode");
  });
});
