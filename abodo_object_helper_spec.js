/* globals abodo, assert, describe, it, expect */
//= require abodo_namespace
//= require classes/abodo_object_helper.js
//= require spec_helper.js

describe("ObjectHelper", function () {
  it("Should be able to deep copy", function () {
    var data = [
      { label: "one" },
      { label: "two" },
      { label: "three" }
    ];
    var newCopy = abodo.helpers.ObjectHelper.deepCopy(data);
    expect(newCopy).to.deep.include.members(data);
    data.should.eql(data);
    data.should.equal(data);
  });

  it("Should be unable to deep copy", function () {
    var newCopy = abodo.helpers.ObjectHelper.deepCopy(undefined);
    assert(newCopy === undefined, "Should be undefined");
  });

  it("Should validate a string", function () {
    var myString = "I am a string";
    abodo.helpers.ObjectHelper.isString(myString).should.be.true;
    abodo.helpers.ObjectHelper.isString("").should.be.true;
    abodo.helpers.ObjectHelper.isString(null).should.be.false;
    abodo.helpers.ObjectHelper.isString(undefined).should.be.false;
    abodo.helpers.ObjectHelper.isString([]).should.be.false;
    abodo.helpers.ObjectHelper.isString([myString]).should.be.false;
    abodo.helpers.ObjectHelper.isString([1]).should.be.false;
  });

  it("Should validate numeric", function () {
    abodo.helpers.ObjectHelper.isNumeric(null).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric(undefined).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric("myString").should.be.false;
    abodo.helpers.ObjectHelper.isNumeric([]).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric(["mystring"]).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric([1, "mystring"]).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric([1, 2, 3]).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric([1]).should.be.false;
    abodo.helpers.ObjectHelper.isNumeric(1).should.be.true;
    abodo.helpers.ObjectHelper.isNumeric(1.00).should.be.true;
    abodo.helpers.ObjectHelper.isNumeric(-1).should.be.true;
  });

  it("Should not be blank", function () {
    abodo.helpers.ObjectHelper.isBlank("").should.be.true;
    abodo.helpers.ObjectHelper.isBlank(null).should.be.true;
    abodo.helpers.ObjectHelper.isBlank(undefined).should.be.true;
    abodo.helpers.ObjectHelper.isBlank([]).should.be.true;
    abodo.helpers.ObjectHelper.isBlank({}).should.be.true;
    abodo.helpers.ObjectHelper.isBlank([1]).should.be.false;
    abodo.helpers.ObjectHelper.isBlank({foo: "bar"}).should.be.false;
    abodo.helpers.ObjectHelper.isBlank(-1).should.be.false;
  });

  it("Should check if includes", function () {
    abodo.helpers.ObjectHelper.include(null, 1).should.be.false;
    abodo.helpers.ObjectHelper.include([], "myString").should.be.false;
    abodo.helpers.ObjectHelper.include({}, "myString").should.be.false;
    abodo.helpers.ObjectHelper.include(["myString"], "myString").should.be.true;
    abodo.helpers.ObjectHelper.include([1, 2], 1).should.be.true;
    abodo.helpers.ObjectHelper.include({"myString":1}, "myString").should.be.true;
    abodo.helpers.ObjectHelper.include({"myString":1}, "notMyString").should.be.false;
    abodo.helpers.ObjectHelper.include([2], 1).should.be.false;
    abodo.helpers.ObjectHelper.include([1, 2, 3], [1, 2]).should.be.true;
    abodo.helpers.ObjectHelper.include([1, 2, 3], [1, 4]).should.be.false;
    abodo.helpers.ObjectHelper.include([1, 2, 3], []).should.be.true;
  });

  it("Should remove element", function () {
    abodo.helpers.ObjectHelper.removeElement([], 1).should.eql([]);
    abodo.helpers.ObjectHelper.removeElement([1], 1).should.eql([]);
    abodo.helpers.ObjectHelper.removeElement(["myString"], "myString").should.eql([]);
    abodo.helpers.ObjectHelper.removeElement([1, 2], 1).should.eql([2]);
    abodo.helpers.ObjectHelper.removeElement([1, 2], 3).should.eql([1, 2]);
    abodo.helpers.ObjectHelper.removeElement([1, 2, 3], 2).should.eql([1, 3]);
  });

  it("Should check if deep equal", function () {
    abodo.helpers.ObjectHelper.deepEqual(1, 1).should.be.true;
    abodo.helpers.ObjectHelper.deepEqual(1, 10).should.be.false;
    abodo.helpers.ObjectHelper.deepEqual(1, "1").should.be.false;
    abodo.helpers.ObjectHelper.deepEqual("string", "String").should.be.false;
    abodo.helpers.ObjectHelper.deepEqual("string", "string").should.be.true;
    abodo.helpers.ObjectHelper.deepEqual(1, [1]).should.be.false;
    abodo.helpers.ObjectHelper.deepEqual([1], [1]).should.be.true;
    abodo.helpers.ObjectHelper.deepEqual([1,2], [1]).should.be.false;
    abodo.helpers.ObjectHelper.deepEqual([1,2], [2,1]).should.be.false;
    abodo.helpers.ObjectHelper.deepEqual({ a: 1 }, { a: 1 }).should.be.true;
    abodo.helpers.ObjectHelper.deepEqual({ a: [3,4], b: "string" }, { b: "string", a: [3,4] }).should.be.true;
    abodo.helpers.ObjectHelper.deepEqual([{ a: 1 }], [{ a: 1 }]).should.be.true;
  });
});
