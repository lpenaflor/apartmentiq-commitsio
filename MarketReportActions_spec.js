/* globals abodo, before, after, describe, it, expect, reduxThunk, reduxMockStore, fetchMock, moment, MarketReportLoadingKeys */
//= require spec_helper

var thunk = reduxThunk.default;
var middlewares = [ thunk ];
var mockStore = reduxMockStore.default(middlewares);
var testCSRFToken = "someToken";
var mockResponse = { hello: "world" };
var filters = {
  startDate: moment(new Date("2017-03-04")),
  endDate: moment(new Date("2017-04-04")),
  marketID: 1
};

describe("MarketReportActions", function () {
  before(function () {
    SpecHelper.addMetaCSRFToken(testCSRFToken);
    fetchMock.get("*", mockResponse); // mock all requests
  });

  after(function () {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("Matches actions when filtersWillChange is called", function (done) {
    // all of the events that are dispatched in `filtersWillChange`
    // remember this is all async consistant order is not expected
    // see assertion below
    var expectedActions = [
      {
        type: abodo.actions.MarketReportActions.SET_LOADING,
        key: MarketReportLoadingKeys.FILTERED_SEARCHES,
        isLoading: true
      },
      {
        type: abodo.actions.MarketReportActions.FILTERS_DID_CHANGE,
        filters: filters
      }
    ];

    var store = mockStore({});
    store.dispatch(abodo.actions.MarketReportActions.filtersWillChange(filters));
    // object equality will not work here because we have the same key with 2 different
    // values, eg (true and false) so we check if the object is a superset and then
    // members are checked for deep equality
    expect(store.getActions()).to.deep.include.members(expectedActions);
    done();
  });

  it("Matches actions when requestFilteredSearches is called", function (done) {
    var expectedActions = [
      {
        type: abodo.actions.MarketReportActions.SET_LOADING,
        key: MarketReportLoadingKeys.FILTERED_SEARCHES,
        isLoading: true
      },
      {
        type: abodo.actions.MarketReportActions.SET_LOADING,
        key: MarketReportLoadingKeys.FILTERED_SEARCHES,
        isLoading: false
      },
      {
        type: abodo.actions.MarketReportActions.FILTERED_SEARCHES_DID_CHANGE,
        data: mockResponse
      }
    ];

    var store = mockStore({});
    return store.dispatch(abodo.actions.MarketReportActions.requestFilteredSearches(filters))
      .then(function () {
        expect(store.getActions()).to.deep.include.members(expectedActions);
        done();
      });
  });
});
