/* globals abodo, describe, expect, it, DataList, SortTypes */
//= require spec_helper
//= require classes/data_list.js
//= require lazy.min.js

var customInitialState, DataSearchReducer, objA, objB, objC, objD, objE, search_json;

describe("DataSearchReducer", function () {
  beforeEach(function () {
    search_json = [
      {
        "property_id": 3,
        "zero_bedroom_average_vacant_asking_rent": null,
        "one_bedroom_average_vacant_asking_rent": 1075,
        "two_bedroom_average_vacant_asking_rent": null,
        "three_bedroom_average_vacant_asking_rent": null,
        "four_bedroom_average_vacant_asking_rent": null,
        "five_bedroom_average_vacant_asking_rent": null,
        "six_bedroom_average_vacant_asking_rent": null,
        "median_vacant_asking_rent_per_sf": 1.43,
        "vacancy_rate": null,
        "active_listings": 1,
        "lat": "43.0782013",
        "lng": "-89.3887024",
        "number_units": "0",
        "name": "",
        "address": "1 W Gilman St",
        "active_listing_days_on_market": 1,
        "landlord_name": "McGrath",
        "days_since_last_update": 5
      },
      {
        "property_id": 4,
        "zero_bedroom_average_vacant_asking_rent": null,
        "one_bedroom_average_vacant_asking_rent": null,
        "two_bedroom_average_vacant_asking_rent": 1215,
        "three_bedroom_average_vacant_asking_rent": null,
        "four_bedroom_average_vacant_asking_rent": null,
        "five_bedroom_average_vacant_asking_rent": null,
        "six_bedroom_average_vacant_asking_rent": null,
        "median_vacant_asking_rent_per_sf": null,
        "vacancy_rate": 1.333,
        "active_listings": 1,
        "lat": "43.0611",
        "lng": "-89.4955978",
        "number_units": "75",
        "name": "Yorktown Apartments",
        "address": "10 Coronado Ct",
        "active_listing_days_on_market": 1,
        "landlord_name": "McGrath",
        "days_since_last_update": 5
      },
      {
        "property_id": 5,
        "zero_bedroom_average_vacant_asking_rent": null,
        "one_bedroom_average_vacant_asking_rent": null,
        "two_bedroom_average_vacant_asking_rent": null,
        "three_bedroom_average_vacant_asking_rent": null,
        "four_bedroom_average_vacant_asking_rent": null,
        "five_bedroom_average_vacant_asking_rent": null,
        "six_bedroom_average_vacant_asking_rent": 1975,
        "median_vacant_asking_rent_per_sf": 1.4,
        "vacancy_rate": null,
        "active_listings": 1,
        "lat": "43.078701",
        "lng": "-89.3901978",
        "number_units": "14",
        "name": "Morgan House",
        "address": "10 Langdon St",
        "active_listing_days_on_market": 30,
        "landlord_name": "Madison Property Management",
        "days_since_last_update": 10
      },
    ];
  });

  describe("Test Reducer functionality from broadcasted state change", function () {
    beforeEach(function () {
      DataSearchReducer = abodo.reducers.DataSearchReducer;
      customInitialState = {
        dataTableDataProvider: new DataList(search_json),
        originalDataTableDataProvider: new DataList(search_json),
        rawDataTableJSON: search_json,
        filters: {},
        metroId: 8,
        columnSortDirection: {},
        originalLeftNavDataProvider: [],
        leftNavDataProvider: [],
        propertiesAreLoading: true,
        allowedActivities: [],
        originalDataTableColumnSelectorDataProvider: [],
        dataTableColumnSelectorDataProvider: []
      };
    });

    it("should return initial state", function () {
      DataSearchReducer.reducer(undefined, {}).should.eql(abodo.reducers.DataSearchReducer.initialState);
      DataSearchReducer.initialState = customInitialState;
      DataSearchReducer.reducer(undefined, {}).should.eql(customInitialState);
    });

    it("should have allowedActivities for permissions", function () {
      customInitialState.allowedActivities = ["intelligence_admin"];
      DataSearchReducer.initialState = customInitialState;
      var reducerObj = DataSearchReducer.reducer(undefined, {});
      assert(reducerObj.allowedActivities.indexOf("intelligence_admin") > -1, "Should contain a permission");
    });

    it("should apply filters through reducer", function () {

      DataSearchReducer.initialState = customInitialState;
      DataSearchReducer.reducer(undefined, {}).dataTableDataProvider.getSize().should.equal(3);

      var filters = {
        complexFilters: {
          type: "RuleSet",
          andChildren: false,
          children: [
            { type: "Rule", comparisonOption: ">", hashField: "number_units", value: "10" }
          ]
        }
      };

      var oneFilterChangedAction = {
        type: abodo.actions.DataSearchActions.FILTERS_CHANGED,
        filters: filters
      };
      var state = DataSearchReducer.reducer(customInitialState, oneFilterChangedAction);
      state.dataTableDataProvider.getSize().should.equal(2);

      filters = {
        complexFilters: {
          type: "RuleSet",
          andChildren: false,
          children: [
            { type: "Rule", comparisonOption: ">", hashField: "number_units", value: "1000" }
          ]
        }
      };

      var twoFilterChangedAction = {
        type: abodo.actions.DataSearchActions.FILTERS_CHANGED,
        filters: filters
      };

      state = DataSearchReducer.reducer(customInitialState, twoFilterChangedAction);

      expect(state.dataTableDataProvider).to.not.be.null;
      state.dataTableDataProvider.getSize().should.equal(0);
    });

    it("should apply sorting through reducer", function () {
      var sortingChangedAction = {
        type: abodo.actions.DataSearchActions.SORTING_CHANGED,
        columnKey: "median_vacant_asking_rent_per_sf",
        sortDirection: SortTypes.DESC
      };

      var state = DataSearchReducer.reducer(customInitialState, sortingChangedAction);
      state.dataTableDataProvider.getSize().should.equal(3);
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.DESC, "median_vacant_asking_rent_per_sf").should.be.true;
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.ASC, "median_vacant_asking_rent_per_sf").should.be.false;

      // test ascending order
      sortingChangedAction.columnKey = "two_bedroom_average_vacant_asking_rent";
      sortingChangedAction.sortDirection = SortTypes.ASC;

      state = DataSearchReducer.reducer(customInitialState, sortingChangedAction);
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.ASC, "vacancy_rate").should.be.true;
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.DESC, "vacancy_rate").should.be.false;

      sortingChangedAction.columnKey = "two_bedroom_average_vacant_asking_rent";
      state = DataSearchReducer.reducer(customInitialState, sortingChangedAction);
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.ASC, "two_bedroom_average_vacant_asking_rent").should.be.true;
      SpecHelper.isSorted(state.dataTableDataProvider._data, SortTypes.DESC, "two_bedroom_average_vacant_asking_rent").should.be.false;
    });

    it("Should filter left nav through reducer", function () {
      var searchTextChangedAction = {
        type: abodo.actions.DataSearchActions.PROPERTY_SEARCH_TEXT_CHANGED,
        searchText: "1 west"
      };
      var leftNavDataProvider = [{
        category: { label: "SEARCH" }
      },{
        category: { label: "MY PROPERTIES" },
        items: [
          { label: "One", address: "1 West Main" },
          { label: "Two" },
          { label: "Three" }
        ]
      }];
      customInitialState.originalLeftNavDataProvider = leftNavDataProvider;
      customInitialState.leftNavDataProvider = leftNavDataProvider;
      var state = DataSearchReducer.reducer(customInitialState, searchTextChangedAction);
      state.originalLeftNavDataProvider[1].items.length.should.equal(3);
      state.leftNavDataProvider[1].items.length.should.equal(1);
    });
  });

  describe("Range Comparator", function () {
    it("should properly determine integer range", function () {
      abodo.reducers.DataSearchReducer.isInRange(-1, 1, 5).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(2, 1, 5).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(2, -1, 5).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(5, 5, 5).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(0, 1, 5).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(0, 0, 1).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(1, 0, -1).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(-1, -2, -1).should.be.true;
    });

    it("should properly determine float range", function () {
      abodo.reducers.DataSearchReducer.isInRange(-1.00, 0.50, 2.00).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(0.75, 0.50, 2.00).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(0.75, 1.50, 2.00).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(0.75, -1.50, 2.00).should.be.true;
      abodo.reducers.DataSearchReducer.isInRange(0.75, 1.50, -1.00).should.be.false;
      abodo.reducers.DataSearchReducer.isInRange(-1.00, -1.50, -1.00).should.be.true;
    });
  });

  describe("Sorting Comparator", function () {
    beforeEach(function () {
      objA = 0.50;
      objB = 1.00;
      objC = 2.00;
      objD = 1.50;
      objE = 1.00;
    });

    it("should properly sort with a regular columnKey", function () {

      DataSearchReducer.sortDataTableDataProviderComparator(
        objA,
        objB,
        SortTypes.DESC
      ).should.equal(1);

      DataSearchReducer.sortDataTableDataProviderComparator(
        objA,
        objB,
        SortTypes.ASC
      ).should.equal(-1);


      DataSearchReducer.sortDataTableDataProviderComparator(
        objC,
        objD,
        SortTypes.DESC
      ).should.equal(-1);

      DataSearchReducer.sortDataTableDataProviderComparator(
        objC,
        objD,
        SortTypes.ASC
      ).should.equal(1);

    });

    it("should properly sort with a regular columnKey for equal values", function () {
      DataSearchReducer.sortDataTableDataProviderComparator(
        objB,
        objE,
        SortTypes.DESC
      ).should.equal(0);

      DataSearchReducer.sortDataTableDataProviderComparator(
        objB,
        objE,
        SortTypes.ASC
      ).should.equal(0);
    });
  });

  describe("LeftNavDataProvider filtering", function () {
    it("Should find section index for my properties", function () {
      var data = [{
        category: { label: "SEARCH" }
      },{
        category: { label: "MY PROPERTIES" },
        items: [
          { label: "One" },
          { label: "Two" },
          { label: "Three" }
        ]
      }];
      DataSearchReducer.getCategoryIndexFromDataProviderFromLabel(data, "my properties").should.equal(1);
      DataSearchReducer.getCategoryIndexFromDataProviderFromLabel(data, "missing category").should.equal(-1);
    });

    it("Should filter category items", function () {
      var data = [{
        category: { label: "SEARCH" }
      },{
        category: { label: "MY PROPERTIES" },
        items: [
          { label: "One", address: "1 West Main" },
          { label: "Two" },
          { label: "Three" }
        ]
      }];
      DataSearchReducer.getFilteredCategoryItems(data[1].items, "two").length.should.equal(1);
      DataSearchReducer.getFilteredCategoryItems(data[1].items, "four").length.should.equal(0);
      DataSearchReducer.getFilteredCategoryItems(data[1].items, "1 west").length.should.equal(1);
    });
  });

  describe("DataTableColumnSelector building", function () {
    it("Should build DataTableColumnSelectorDataProvider", function () {
      var defaultDataTableColumnSelectorDataProvider = [
        { label: "Property", value: true, id: "address", flexGrow: 1, width: 200 },
        { label: "Studio Avg Vacant Rent", value: true, id: "zero_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant Studios", value: true, id: "zero_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "1 Bed Avg Vacant Rent", value: true, id: "one_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 1 Beds", value: true, id: "one_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "2 Bed Avg Vacant Rent", value: true, id: "two_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 2 Beds", value: true, id: "two_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "3 Bed Avg Vacant Rent", value: true, id: "three_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 3 Beds", value: true, id: "three_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "4 Bed Avg Vacant Rent", value: true, id: "four_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 4 Beds", value: true, id: "four_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "5 Bed Avg Vacant Rent", value: true, id: "five_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 5 Beds", value: true, id: "five_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "6 Bed Avg Vacant Rent", value: true, id: "six_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant 6 Beds", value: true, id: "six_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
        { label: "Median Vacant Price/Sq. Ft.", value: true, id: "median_vacant_asking_rent_per_sf", flexGrow: 1, width: 100 },
        { label: "Vacant Units", value: true, id: "vacant_unit_count", flexGrow: 1, width: 134 },
        { label: "Total Units", value: true, id: "number_units", flexGrow: 1, width: 100 },
        { label: "Vacancy", value: true, id: "vacancy_rate", flexGrow: 1, width: 84 },
        { label: "Advertised Specials", value: true, id: "rent_specials", flexGrow: 1, width: 120 },
        { label: "Year Built", value: true, id: "year_built", flexGrow: 1, width: 100 },
        { label: "Property Manager", value: true, id: "landlord_name", flexGrow: 1, width: 200 },
        { label: "Last Updated (Days)", value: true, id: "days_since_last_update", flexGrow: 1, width: 120 }
      ];

      var selectedColumns = [
        { label: "Property", value: true, id: "address", flexGrow: 1, width: 200 },
        { label: "Studio Avg Vacant Rent", value: true, id: "zero_bedroom_average_vacant_asking_rent", flexGrow: 1, width: 90 },
        { label: "Vacant Studios", value: true, id: "zero_bedroom_vacant_unit_count", flexGrow: 1, width: 90 },
      ];

      DataSearchReducer.buildDataTableColumnSelectorDataProvider(
        defaultDataTableColumnSelectorDataProvider,
        selectedColumns
      ).length.should.equal(23);

      var colsToTest = DataSearchReducer.buildDataTableColumnSelectorDataProvider(
        defaultDataTableColumnSelectorDataProvider,
        selectedColumns
      );

      colsToTest[0].value.should.be.true;
      colsToTest[1].value.should.be.true;
      colsToTest[2].value.should.be.true;
      colsToTest[3].value.should.be.false;

    });
  });
});
