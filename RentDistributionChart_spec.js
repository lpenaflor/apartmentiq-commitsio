/* globals abodo, assert, describe, enzyme, it, React, Redux, RentDistributionChart */
//= require spec_helper
//= require classes/abodo_object_helper.js
//= require recharts.min.js
//= require formatters/recharts/ChartComponentFormatters.js
//= require abodo_helper.js

describe("RentDistributionChart", function () {
  it("Should calculate tics for rent distribution chart", function () {
    var props = {
      isLoading: false,
      dataProvider: {
        distribution: [
          { name: 500, count: 10 },
          { name: 1000, count: 10 },
          { name: 842, count: 10 },
          { name: 1200, count: 0.2 }
        ]
      }
    };

    var chart = SpecHelper.getMountedComponent(abodo.components.Recharts.RentDistributionChart, props).node;

    var ticks = chart.getTicksForRentDistribution();
    assert(ticks[0] === 500);
    assert(ticks[1] === 600);
    assert(ticks[2] === 700);
    assert(ticks[3] === 800);
    assert(ticks[4] === 900);
    assert(ticks[5] === 1000);
  });
});
