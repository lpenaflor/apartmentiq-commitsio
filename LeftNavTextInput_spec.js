/* globals abodo, */
//= require spec_helper
var props, textInput;

describe("LeftNavTextInput", function () {
  beforeEach(function () {
    props = {
      textInputId: "myID",
      placeholder: "New Placeholder",
      enableKeyStrokeEvent: false
    };
    textInput = abodo.components.LeftNavTextInput;
  });

  it("Should display placeholder text", function () {
    SpecHelper.getMountedComponent(textInput, props);
    assert(document.getElementById("myID").placeholder === "New Placeholder", "Should equal");
  });

  it("Should display for filter search", function () {
    props.placeholder = "Search";
    props.enableKeyStrokeEvent = true;

    var wrapper = SpecHelper.getMountedComponent(textInput, props);
    assert(wrapper.find(".left-nav-fa-search").nodes.length === 1, "Should be search mode");
  });

  describe("componentDidMount", function () {
    it("Should focus in text input", function () {
      sinon.spy(abodo.components.LeftNavTextInput.prototype, "componentDidMount");
      props.autofocus = true;
      props.enableKeyStrokeEvent = false;

      var textInput = abodo.components.LeftNavTextInput;
      SpecHelper.getMountedComponent(textInput, props);

      assert(
        abodo.components.LeftNavTextInput.prototype.componentDidMount.callCount === 1,
        "Should be called once"
      );
      assert(
        document.activeElement === document.getElementById("myID"),
        "textinput should be focused and activeElement");
      abodo.components.LeftNavTextInput.prototype.componentDidMount.restore();
    });

    it("Should handle enter key down", function () {
      sinon.spy(abodo.components.LeftNavTextInput.prototype, "componentDidMount");
      var onChangeSpy = sinon.spy();
      props.onChange = onChangeSpy;

      var newInput = abodo.components.LeftNavTextInput;
      SpecHelper.getMountedComponent(newInput, props);
      assert(abodo.components.LeftNavTextInput.prototype.componentDidMount.callCount === 1, "Should be called once");

      // simulate pressing enter
      var evt = document.createEvent("Events");
      evt.initEvent("keydown", true, true);
      evt.keyCode = 13;
      evt.which = 13;
      document.getElementById("myID").dispatchEvent(evt);

      assert(onChangeSpy.callCount === 1, "Should have called the spy");
      abodo.components.LeftNavTextInput.prototype.componentDidMount.restore();
    });
  });
});
