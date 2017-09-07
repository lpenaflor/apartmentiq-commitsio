/* globals abodo, assert, describe, enzyme, it, React, Redux, MarketReportContents */
//= require spec_helper
//= require jquery-ui.min.js
//= require classes/abodo_object_helper.js
var contents;

describe("MarketReportContents", function () {
  beforeEach(function () {
    contents = Object.create(MarketReportContents.prototype);
  });

  it("Should calculate the domain for the user volume chart", function () {
    var supplyAndDemandDataProvider = [{ count: -60 }, { count: 40 }, { count: 20 }];
    var domain = contents.getYDomainForUserVolume(supplyAndDemandDataProvider);
    assert(domain[0] === -60);
    assert(domain[1] === 60);
  });

  it("Should calculate tics for the user volume chart", function () {
    var ticks = contents.getTicksForUserVolume(100);
    assert(ticks[0] === -100);
    assert(ticks[1] === -66);
    assert(ticks[2] === -33);
    assert(ticks[3] === 0);
    assert(ticks[4] === 33);
    assert(ticks[5] === 66);
    assert(ticks[6] === 100);

    ticks = contents.getTicksForUserVolume(75);
    assert(ticks[0] === -75);
    assert(ticks[1] === -50);
    assert(ticks[2] === -25);
    assert(ticks[3] === 0);
    assert(ticks[4] === 25);
    assert(ticks[5] === 50);
    assert(ticks[6] === 75);
  });
});
