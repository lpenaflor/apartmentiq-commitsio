/* globals abodo, assert, describe, enzyme, it, React, Redux, ReactDOM */
//= require spec_helper
//= require jquery-ui.min.js
//= require classes/abodo_object_helper.js
var SearchFiltersComponent;

describe("SearchFilters", function () {
  beforeEach(function () {
    SearchFiltersComponent = abodo.components.SearchFilters;
  });

  it("Should render filter button", function () {
    var props = {
      store: Redux.createStore(abodo.reducers.DataSearchReducer.reducer)
    };

    var wrapper = ReactDOM.render(
      React.createElement(SearchFiltersComponent, props),
      SpecHelper.getRootElement()
    );
    var $wrapper = $(ReactDOM.findDOMNode(wrapper));

    assert($wrapper.find(".filter-button").length === 1, "Should have a button");
  });

  it("Should open and close", function () {
    var props = {
      store: Redux.createStore(abodo.reducers.DataSearchReducer.reducer)
    };

    var wrapper = ReactDOM.render(
      React.createElement(SearchFiltersComponent, props),
      SpecHelper.getRootElement()
    );
    var $wrapper = $(ReactDOM.findDOMNode(wrapper));

    // Enzyme synthetic events for testing will not work if we are using
    // dispatchEvent from a non managed react way
    var button = $wrapper.find(".filter-button")[0];
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    button.dispatchEvent(evt);
    assert($wrapper.find(".filter-panel-container").length === 1, "Should have a panel");

    // toggle close
    button.dispatchEvent(evt);
    assert($wrapper.find(".filter-panel-container").length === 0, "Should no longer have a panel");
  });

  it("Should display market-report filters", function () {
    var props = {
      store: Redux.createStore(abodo.reducers.MarketReportReducer.reducer)
    };
    var MarketReportFiltersPanel = abodo.components.forms.MarketReportFilters;

    var wrapper = ReactDOM.render(
      React.createElement(SearchFiltersComponent, props),
      SpecHelper.getRootElement()
    );
    wrapper.setState({
      canApplyFilters: true
    });

    var $wrapper = $(ReactDOM.findDOMNode(wrapper));

    var button = $wrapper.find(".filter-button");
    button.click();

    assert($wrapper.find(".filter-panel-container").length === 1, "Should have a panel");
  });
});
