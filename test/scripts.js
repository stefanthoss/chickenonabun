var assert = require("assert");

describe("calcHaversineDistance", function() {
  var coords = [
    [122.5, -30.8],
    [122.5, -30.8]
  ];

  it("Calculate no distance", function() {
    assert.equal(calcHaversineDistance(coords[0], coords[1]), 0);
  });
});
