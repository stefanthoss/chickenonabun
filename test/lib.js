const { equal } = require("assert");

const calcHaversineDistance = require("../assets/javascripts/lib.js");

describe("calcHaversineDistance", function() {
  var coords = [
    [122.5, -30.8],
    [122.5, -30.8]
  ];

  it("Calculate no distance", function() {
    equal(calcHaversineDistance(coords[0], coords[1]), 0);
  });
});
