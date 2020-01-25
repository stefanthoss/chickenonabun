const { equal } = require("assert");

const calcHaversineDistance = require("../assets/javascripts/lib.js");

describe("calcHaversineDistance", function() {
  var coords = [
    [122.5, -30.8],
    [-80.76, 14],
    [37.0,-122.0],
    [0,0],
    [122.49, -30.81],
    [15.98,-158.14],
    [20.73,147.85]
  ];

  it("Same coordinates", function() {
    equal(calcHaversineDistance(coords[0], coords[0]), 0);
  });

  it("Different coordinates", function() {
    equal(Math.round(calcHaversineDistance(coords[0], coords[1])), 17050);
    equal(Math.round(calcHaversineDistance(coords[0], coords[2])), 6549);
    equal(Math.round(calcHaversineDistance(coords[2], coords[5])), 4249);
  });

  it("Small distance", function() {
    equal(Math.round(calcHaversineDistance(coords[0], coords[4])), 1);
  });

  it("Distance to null island", function() {
    equal(Math.round(calcHaversineDistance(coords[3], coords[2])), 12792);
  });

  it("Cross the date line", function() {
    equal(Math.round(calcHaversineDistance(coords[5], coords[6])), 5700);
  });
});
