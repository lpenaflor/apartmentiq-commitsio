/* globals abodo, describe, expect, it, PropertyPageLoadingKeys */
//= require spec_helper
//= require reducers/PropertyPageReducer.js

var customInitialState, PropertyPageReducer, yearBuilt, lat, lng, defaultAction, student, unitCount;

describe("PropertyPageReducer", function () {
  beforeEach(function () {
    yearBuilt = "2002";
    lat = 45;
    lng = -90;
    student = true;
    unitCount = "30";
    customInitialState = {
      filters: {},
      property: {
        lat: lat,
        lng: lng,
        number_units: unitCount,
        amenities_hash: {
          Amenities: {
            attrs: [
              { name: "Student", value: "true" }
            ]
          }
        },
        additional_details: [
           { title: "Year Built", value: yearBuilt }
        ]
      },
      user: {},
      openGallery: false,
      galleryDataProvider: {},
      yearBuilt: yearBuilt,
      unitCount: unitCount,
      lat: lat,
      lng: lng,
      student: student,
      filteredSearchesDataProvider: {
        floorplans: [],
        amenities: [],
        rent_distribution: {},
        seven_day_moving_average: []
      },
      filteredSearchesIsLoading: true,
      competitionDataProvider: {},
      competitionIsLoading: true,
      viewedOrContacted: "viewed"
    };

    PropertyPageReducer = abodo.reducers.PropertyPageReducer;

    defaultAction = {
      type: "@@redux/INIT"
    };
  });

  it("should return initial state", function () {
    PropertyPageReducer.reducer(undefined, {}).should.eql(
      abodo.reducers.PropertyPageReducer.initialState
    );
  });

  it("should extract year built", function () {
    var state = PropertyPageReducer.reducer(customInitialState, defaultAction);
    state.yearBuilt.should.eql(yearBuilt.toString());
  });

  it("should extract student", function () {
    var state = PropertyPageReducer.reducer(customInitialState, defaultAction);
    state.student.should.eql(true);
  });

  it("should extract lat/lng", function () {
    var state = PropertyPageReducer.reducer(customInitialState, defaultAction);
    state.lat.should.eql(lat);
    state.lng.should.eql(lng);
  });

  it("should handle SET_LOADING", function () {
    var setLoadingState = {
      type: abodo.actions.PropertyPageActions.SET_LOADING,
      key: PropertyPageLoadingKeys.FILTERED_SEARCHES,
      isLoading: false
    };

    var state = PropertyPageReducer.reducer(customInitialState, setLoadingState);
    state.filteredSearchesIsLoading.should.be.false;

    setLoadingState.key = PropertyPageLoadingKeys.FILTERED_SEARCHES;
    setLoadingState.isLoading = true;
    var state2 = PropertyPageReducer.reducer(state, setLoadingState);
    state2.filteredSearchesIsLoading.should.be.true;

    setLoadingState.key = PropertyPageLoadingKeys.FILTERED_SEARCHES;
    setLoadingState.isLoading = false;
    var state3 = PropertyPageReducer.reducer(state2, setLoadingState);
    state3.filteredSearchesIsLoading.should.be.false;
  });

  it("should handle FILTERED_SEARCHES_DID_CHANGE", function () {
    var filteredSearchesState = {
      type: abodo.actions.PropertyPageActions.FILTERED_SEARCHES_DID_CHANGE,
      data: [{
        id: 10
      }]
    };

    var state = PropertyPageReducer.reducer(customInitialState, filteredSearchesState);
    state.should.eql({
      filters: {},
      property: {
        lat: lat,
        lng: lng,
        number_units: unitCount,
        amenities_hash: {
          Amenities: {
            attrs: [
              { name: "Student", value: "true" }
            ]
          }
        },
        additional_details: [
           { title: "Year Built", value: yearBuilt }
        ]
      },
      user: {},
      openGallery: false,
      galleryDataProvider: {},
      yearBuilt: yearBuilt,
      unitCount: unitCount,
      lat: lat,
      lng: lng,
      student: student,
      filteredSearchesDataProvider: [{ id: 10 }],
      filteredSearchesIsLoading: true,
      competitionDataProvider: {},
      competitionIsLoading: true,
      viewedOrContacted: "viewed"
    });
  });
});
