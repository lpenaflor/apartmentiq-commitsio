/* globals abodo, assert, describe, enzyme, it, React, Redux, ReactDOM */
//= require spec_helper
//= require jquery-ui.min.js
//= require classes/abodo_object_helper.js

/*
 * 6/12/17
 * We cannot use Enzyme to test this component due to the following error message:
 *
 * `addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a
 * ref to a component that was not created inside a component's render method, or you
 * have multiple copies of React loaded.`
 *
 */

describe("MarketReportFilters", function () {
  it("Should display warning error for incorrect range", function () {
    var props = {
      numUnitsMin: 100,
      numUnitsMax: 1
    };

    var wrapper = ReactDOM.render(
      React.createElement(abodo.components.forms.MarketReportFilters, props),
      SpecHelper.getRootElement()
    );
    wrapper.setState({
      canApplyFilters: true
    });

    var $wrapper = $(ReactDOM.findDOMNode(wrapper));

    $wrapper.find(".filter-panel-apply-button").click();
    assert($wrapper.find(".error-message-text").text() === "Invalid Range", "Should have text");

    // clear values
    $wrapper.find(".filter-panel-clear-button").click();
    assert($wrapper.find(".error-message-text").text() === "", "Should be empty text");
  });

  it("Should Render MarketReportFilters with preset values", function () {
    var props = {
      bedrooms: ["1", "2"],
      maxRentMin: 500,
      maxRentMax: 2000,
      numUnitsMin: 15,
      numUnitsMax: 30,
      yearBuiltMin: 1990,
      yearBuiltMax: 2010,
      rentRangeGroup: "1"
    };

    var MarketReportFilters = abodo.components.forms.MarketReportFilters;
    var wrapper = ReactDOM.render(
      React.createElement(MarketReportFilters, props),
      SpecHelper.getRootElement()
    );

    wrapper.setState({
      canApplyFilters: true
    });

    var $wrapper = $(ReactDOM.findDOMNode(wrapper));

    var sliderValues = $wrapper.find(".rheostat-handle").map(function() {
      return ($(this).attr("aria-valuenow"));
    });
    assert(sliderValues[0] === "500", "maxRentMin should equal 500, got: " + sliderValues);
    assert(sliderValues[1] === "2000", "maxRentMax should equal 2000, got: " + sliderValues);
    $wrapper.find(".intelligence-checkbox-input")[0].value.should.equal("0"); // studio
    $wrapper.find(".intelligence-checkbox-input")[0].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[1].value.should.equal("1"); // 1 bed
    $wrapper.find(".intelligence-checkbox-input")[1].checked.should.be.true;
    $wrapper.find(".intelligence-checkbox-input")[2].value.should.equal("2"); // 2 bed
    $wrapper.find(".intelligence-checkbox-input")[2].checked.should.be.true;
    $wrapper.find(".intelligence-checkbox-input")[3].value.should.equal("3");
    $wrapper.find(".intelligence-checkbox-input")[3].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[4].value.should.equal("4");
    $wrapper.find(".intelligence-checkbox-input")[4].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[5].value.should.equal("5");
    $wrapper.find(".intelligence-checkbox-input")[5].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[6].value.should.equal("6");
    $wrapper.find(".intelligence-checkbox-input")[6].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[7].value.should.equal("7");
    $wrapper.find(".intelligence-checkbox-input")[7].checked.should.be.false;
    $wrapper.find(".intelligence-checkbox-input")[8].value.should.equal("8"); // 8 bed
    $wrapper.find(".intelligence-checkbox-input")[8].checked.should.be.false;

    $wrapper.find("[name='numUnitsMin']")[0].value.should.equal("15");
    $wrapper.find("[name='numUnitsMax']")[0].value.should.equal("30");
    $wrapper.find("[name='yearBuiltMin']")[0].value.should.equal("1990");
    $wrapper.find("[name='yearBuiltMax']")[0].value.should.equal("2010");
  });
});
