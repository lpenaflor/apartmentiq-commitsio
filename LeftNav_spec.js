/* globals abodo, assert, describe, enzyme, it, React */
//= require spec_helper
var mount = enzyme.mount;
var defaultNavProps, LeftNav, LeftNavButton, LeftNavCategoryHeading;

describe("LeftNav", function () {
  beforeEach(function () {
    LeftNav = abodo.components.LeftNav;
    LeftNavButton = abodo.components.LeftNavButton;
    LeftNavCategoryHeading = abodo.components.LeftNavCategoryHeading;

    defaultNavProps = {
      dataProvider: [{
          category: { label: "Default Header"},
          items: [
            { label: "One" },
            { label: "Two" },
            { label: "Three" }
          ]
        }
      ]
    };
  });

  it("should render one LeftNavCategoryHeading and 3 LeftNavButtons", function () {
    var props = {
      dataProvider: [{
          category: { label: "MY PROPERTIES" },
          items: [
            { label: "Foo", property_id: 5432 },
            { label: "Bar", property_id: 234234 },
            { label: "Yo", property_id: 65 }
          ]
        }
      ]
    };

    var wrapper = SpecHelper.getMountedComponent(LeftNav, props, false);
    assert(wrapper.find(LeftNavButton).length === 3, "Should be 3 buttons");
    assert(wrapper.find(LeftNavCategoryHeading).length === 1, "Should be 1 category header");
  });

  it("should render a section with empty heading and one LeftNavButton", function () {
    var props = {
      dataProvider: [{
          category: { label: null },
          items: [
            { title: "Search" }
          ]
        }
      ]
    };

    var wrapper = SpecHelper.getMountedComponent(LeftNav, props, false);
    assert(wrapper.find(LeftNavButton).length === 1, "Should be 1 buttons");
    assert(wrapper.find(LeftNavCategoryHeading).length === 1, "Should be 1 category header");
  });

  it("Should set a selectedIndex", function () {
    defaultNavProps.selectedIndex = [0,1];
    var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
    assert(wrapper.find(".left-nav-button.selected").length === 1, "Should be 1 selected button");
    assert(
      wrapper.find(".left-nav-button.selected").nodes[0].innerText === "Two",
      "Label should be `Two`"
    );
  });

  it("Should call onChange callback and return selectedItem", function (done) {
    var testObject = { label: "Search" };
    var props = {
      dataProvider: [{
          category: { label: null },
          items: [
            testObject
          ]
        }
      ],
      onChange: function (e) {
        e.selectedItem.should.eql(testObject);
        done();
      }
    };

    var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
    wrapper.find(".left-nav-button").simulate("click");
  });

  describe("DataProvider buttonField toggling", function () {
    it("Should be able to use the default buttonField", function () {
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavButton).length === 3, "Should be 3 buttons with default key");
    });

    it("Should be able to set the buttonField", function () {
      defaultNavProps.dataProvider = [{
          category: { label: null },
          customButtonField: [
            { label: "Button 1" },
            { label: "Button 2" }
          ]
        }
      ];
      defaultNavProps.buttonField = "customButtonField";
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavButton).length === 2, "Should be 2 buttons with default key");
    });

    it("Should be able to set the buttonField and buttonLabelField", function () {
      defaultNavProps.dataProvider = [{
          category: { label: null },
          customButtonField: [
            { customLabelField: "Button 1" }
          ]
        }
      ];
      defaultNavProps.buttonField = "customButtonField";
      defaultNavProps.buttonLabelField = "customLabelField";
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavButton).length === 1, "Should be 1 button with default key");
      assert(
        wrapper.find(".left-nav-button").nodes[0].innerText === "Button 1",
        "Label should be `Button 1`"
      );
    });
  });

  describe("DataProvider buttonLabelField toggling", function () {
    it("Should be able to use the default buttonLabelField", function () {
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavButton).length === 3, "Should be 3 buttons with default key");
      assert(
        wrapper.find(".left-nav-button").nodes[0].innerText === "One",
        "Label should be `One`"
      );
    });

    it("Should be able to set the buttonLabelField", function () {
      var props = {
        dataProvider: [{
            category: { label: null},
            items: [
              { title: "One" },
              { title: "Two" },
              { title: "Three" }
            ]
          }
        ],
        buttonLabelField: "title"
      };

      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      assert(wrapper.find(LeftNavButton).length === 3, "Should be 3 buttons with custom key");
      assert(
        wrapper.find(".left-nav-button").nodes[1].innerText === "Two",
        "Label should be `Two`"
      );
    });

    it("Should have empty buttons when buttonLabelField is not set", function () {
      var props = {
        dataProvider: [{
            category: { label: null},
            items: [
              { title: "One" },
              { title: "Two" },
              { title: "Three" }
            ]
          }
        ]
      };

      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      assert(wrapper.find(LeftNavButton).length === 3, "Should be 3 buttons with custom key");
      assert(
        wrapper.find(".left-nav-button").nodes[1].innerText === "",
        "Label should be an empty string"
      );
    });
  });

  describe("DataProvider buttonBadgeLabelField toggling", function () {
    it("Should be able to use the default buttonBadgeLabelField", function () {
      var props = {
        dataProvider: [{
            category: { label: "Default Header"},
            items: [
              { label: "Report 1", badge: 5 },
              { label: "Report 2" }
            ]
          }
        ]
      };

      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      assert(wrapper.find(LeftNavButton).length === 2, "Should be 2 buttons");
      assert(wrapper.find(".left-nav-button-badge").length === 1, "Should be 1 badges");
      assert(
        wrapper.find(".left-nav-button-badge").nodes[0].innerText === "5",
        "Badge should equal string `5`"
      );
    });
  });

  describe("DataProvider categoryField toggling", function () {
    it("Should be able to use the default categoryField and default categoryLabelField", function () {
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavCategoryHeading).length === 1, "Should be 1 Category Heading");
      assert(
        wrapper.find(".left-nav-category").nodes[0].innerText === "Default Header",
        "Category Header Label should be `Default Header`"
      );
    });

    it("Should be able to set the categoryField", function () {
      var props = {
        dataProvider: [{
            groupName: { label: "MY PROPERTIES" },
            items: [
              { label: "Button 1" },
            ]
          }
        ],
        categoryField: "groupName"
      };

      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      assert(
        wrapper.find(".left-nav-category").nodes[0].innerText === "MY PROPERTIES",
        "Category Header Label should be `MY PROPERTIES`"
      );
    });

    it("Should be able to set the categoryField and categoryLabelField", function () {
      var props = {
        dataProvider: [{
            property: { address: "640 West Main St." },
            items: [
              { label: "Button 1" },
            ]
          }
        ],
        categoryField: "property",
        categoryLabelField: "address"
      };

      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      assert(
        wrapper.find(".left-nav-category").nodes[0].innerText === "640 West Main St.",
        "Category Header Label should be `640 West Main St.`"
      );
    });
  });

  it("Should be able to use a custom DataProvider", function () {
    var props = {
      dataProvider: [{
        property: { id: 65, address: "640 West Main St.", name: "The Stadium" },
        floorplans: [
          { name: "Varsity", type: "1 Bedroom" },
          { name: "Bucky", type: "2 Bedroom" },
        ]
      }],
      buttonField: "floorplans",
      buttonLabelField: "name",
      categoryField: "property",
      categoryLabelField: "name"
    };
    var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
    assert(wrapper.find(LeftNavCategoryHeading).length === 1, "Should be one header");
    assert(
      wrapper.find(".left-nav-category").nodes[0].innerText === "The Stadium",
      "Category Header Label should be `The Stadium`"
    );
    assert(wrapper.find(LeftNavButton).length === 2, "Should be 2 buttons");
    assert(
      wrapper.find(".left-nav-button").nodes[1].innerText === "Bucky",
      "Label should be a `Bucky`"
    );
  });

  describe("Category Clickable", function () {
    it("should not be able to click on category header with categoryClickableField", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      var props = {
        dataProvider: [{
          property: { id: 65, address: "640 West Main St.", name: "The Stadium", active: false },
          floorplans: [
            { name: "Varsity", type: "1 Bedroom" },
            { name: "Bucky", type: "2 Bedroom" },
          ]
        }],
        buttonField: "floorplans",
        buttonLabelField: "name",
        categoryField: "property",
        categoryLabelField: "name",
        categoryClickableField: "active"
      };
      var wrapper = SpecHelper.getMountedComponent(LeftNav, props);
      wrapper.find(".left-nav-category").simulate("click");
      assert(wrapper.find(LeftNavTextInput).length === 0, "Should not have a text input");
    });

    it("should be able to click on category header with categoryClickableField", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      defaultNavProps.dataProvider = [{
        category: { label: "The Stadium", active: true },
        items: [
          { label: "Varsity" }
        ]
      }];
      defaultNavProps.categoryClickableField = "active";
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      wrapper.find(".left-nav-category").simulate("click");
      assert(wrapper.find(LeftNavTextInput).length === 1, "Should have a text input");
    });

    it("Should be able to click on a category header with categoryClickableFunction", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      defaultNavProps.dataProvider = [{
        category: { label: "TEST HEADER" },
        items: [
          { label: "Varsity" }
        ]
      },{
        category: { label: "MY REPORTS" },
        items: [
          { label: "My Report 1" },
          { label: "My Report 2" },
        ]
      }];
      defaultNavProps.categoryClickableFunction = function (categoryIndex) {
        return categoryIndex === 1;
      };
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavCategoryHeading).length === 2, "Should be 2 headers");
      wrapper.find(".left-nav-category.selectable").simulate("click");
      assert(wrapper.find(LeftNavTextInput).length === 1, "Should have a text input");
    });
  });

  describe("Determine selected highlighting after click via selectableFunction callback", function () {
    it("Should be able to use the default selectedFunction callback", function () {
      defaultNavProps.selectedIndex = [0,1];
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(".left-nav-button.selected").length === 1, "Should be 1 selected button");
    });

    it("Should use passed in selectedFunction callback", function () {
      var selectedFunctionSpy = sinon.spy();
      defaultNavProps.selectedIndex = [0,1];
      defaultNavProps.selectedFunction = selectedFunctionSpy;
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(selectedFunctionSpy.calledThrice === true, "Should have been called three times");
    });
  });

  describe("Category Filterable", function () {
    it("Should be able to filter category with categoryFilterableField", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      defaultNavProps.dataProvider = [{
        category: { label: "The Stadium" },
        items: [
          { label: "Varsity" },
        ]
      }];
      defaultNavProps.categoryFilterableField = "label";
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavTextInput).length === 1, "Should have a text input");
      assert(wrapper.find(".left-nav-fa-search").nodes.length === 1, "Should be search icon");
    });

    it("Should not be able to filter category with categoryFilterableField", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      defaultNavProps.dataProvider = [{
        category: { label: "The Stadium" },
        items: [
          { label: "Varsity" },
        ]
      }];
      defaultNavProps.categoryFilterableField = "shouldBeUndefined";
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavTextInput).length === 0, "Should not have a text input");
      assert(wrapper.find(".left-nav-fa-search").nodes.length === 0, "Should be no search icon");
    });

    it("Should be able to filter category with categoryFilterableFunction", function () {
      var LeftNavTextInput = abodo.components.LeftNavTextInput;
      defaultNavProps.dataProvider = [{
        category: { label: "MY REPORTS" },
        items: [
          { label: "My Report 1" },
          { label: "My Report 2" },
        ]
      },{
        category: { label: "MY PROPERTIES" },
        items: [
          { label: "Varsity" },
          { label: "The Hub" },
        ]
      }];
      defaultNavProps.categoryFilterableFunction = function (categoryIndex) {
        return defaultNavProps.dataProvider[categoryIndex].category.label.toLowerCase() === "my properties";
      };
      var wrapper = SpecHelper.getMountedComponent(LeftNav, defaultNavProps);
      assert(wrapper.find(LeftNavCategoryHeading).length === 2, "Should be 2 headers");
      assert(wrapper.find(LeftNavTextInput).length === 1, "Should have a text input");
      assert(wrapper.find(".left-nav-fa-search").nodes.length === 1, "Should be search icon");
    });
  });
});
