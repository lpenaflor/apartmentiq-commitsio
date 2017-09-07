/* globals abodo, describe, expect, it, MarketReportLoadingKeys */
//= require spec_helper
//= require reducers/MarketReportReducer.js

var customInitialState, MarketReportReducer;

describe("MarketReportReducer", function () {
  beforeEach(function () {
    customInitialState = {
      filters: {},
      originalLeftNavDataProvider: [],
      leftNavDataProvider: [],
      filteredSearchesDataProvider: [],
      filteredSearchesIsLoading: false,
      allowedActivities: []
    };
    MarketReportReducer = abodo.reducers.MarketReportReducer;
  });

  it("should return initial state", function () {
    MarketReportReducer.reducer(undefined, {}).should.eql(abodo.reducers.MarketReportReducer.initialState);
  });

  it("should handle SET_LOADING", function () {
    var setLoadingState = {
      type: abodo.actions.MarketReportActions.SET_LOADING,
      key: MarketReportLoadingKeys.FILTERED_SEARCHES,
      isLoading: false
    };

    var state = MarketReportReducer.reducer(customInitialState, setLoadingState);
    state.filteredSearchesIsLoading.should.be.false;

    setLoadingState.key = MarketReportLoadingKeys.FILTERED_SEARCHES;
    setLoadingState.isLoading = true;
    var state2 = MarketReportReducer.reducer(state, setLoadingState);
    state2.filteredSearchesIsLoading.should.be.true;

    setLoadingState.key = MarketReportLoadingKeys.FILTERED_SEARCHES;
    setLoadingState.isLoading = false;
    var state3 = MarketReportReducer.reducer(state2, setLoadingState);
    state3.filteredSearchesIsLoading.should.be.false;
  });

  it("should handle FILTERS_DID_CHANGE", function () {
    var filtersState = {
      type: abodo.actions.MarketReportActions.FILTERS_DID_CHANGE,
      filters: {
        startDate: "2017-03-04",
        endDate: "2017-04-04"
      }
    };
    var state = MarketReportReducer.reducer(customInitialState, filtersState);
    state.should.eql({
      filters: {
        startDate: "2017-03-04",
        endDate: "2017-04-04"
      },
      originalLeftNavDataProvider: [],
      leftNavDataProvider: [],
      filteredSearchesDataProvider: [],
      filteredSearchesIsLoading: false,
      allowedActivities: []
    });
  });

  it("should handle FILTERED_SEARCHES_DID_CHANGE", function () {
    var filteredSearchesState = {
      type: abodo.actions.MarketReportActions.FILTERED_SEARCHES_DID_CHANGE,
      data: [{
        id: 10
      }]
    };

    var state = MarketReportReducer.reducer(customInitialState, filteredSearchesState);
    state.should.eql({
      filters: {},
      originalLeftNavDataProvider: [],
      leftNavDataProvider: [],
      filteredSearchesDataProvider: [{ id: 10 }],
      filteredSearchesIsLoading: false,
      allowedActivities: []
    });
  });

});
