var currentCoords;

var sortLabels = {
  date: "Latest sandwich reviews",
  rating: "Best sandwiches",
  location: "Nearby sandwiches",
};

function sortRestaurantsByLocation(position) {
  currentCoords = [position.coords.latitude, position.coords.longitude];
  console.info("Current position: " + currentCoords);
  sortRestaurants("location");
}

function positionError(error) {
  console.warn("Could not get current position (" + error.code + "): " + error.message);
  window.location.hash = "";
}

function extractSortKey(elements, sortKey) {
  var result = [];

  for (i = 0; i < elements.length; i++) {
    var obj = {};
    obj.element = elements[i];
    obj.key = elements[i].getAttribute("data-" + sortKey);

    if (sortKey == "location") {
      if (obj.key) {
        obj.key = calcHaversineDistance(currentCoords, JSON.parse(obj.key));
      } else {
        obj.key = 20015; // max distance between two points on Earth in km
      }
    }

    result.push(obj);
  }

  return result;
}

function addDistanceLabel(item) {
  item.element.getElementsByClassName("distance-label")[0].innerHTML = Math.round(0.6213712 * item.key) + " miles away";
} 

function sortRestaurants(sortKey) {
  var parent = document.getElementById("restaurant-list");
  var children = parent.getElementsByClassName("post");
  var elements = extractSortKey(children, sortKey);

  if (sortKey == "location") {
    // sort ascending
    elements.sort((a, b) => (a.key - b.key));
    elements.forEach(addDistanceLabel);
  } else {
    // sort descending
    elements.sort((a, b) => (b.key - a.key));
  }

  for (i = 0; i < elements.length; i++) {
    parent.appendChild(elements[i].element);
  }
}

function sortEvent() {
  var sortKey = "date";

  if (location.hash) {
    sortKey = location.hash.substr(1);
  }

  if (sortKey == "location") {
    navigator.geolocation.getCurrentPosition(sortRestaurantsByLocation, positionError);
  } else {
    sortRestaurants(sortKey);
  }

  document.getElementById("sort-label").innerHTML = sortLabels[sortKey];
}

if (window.location.pathname == "/") {
  window.onload = sortEvent;
  window.onhashchange = sortEvent;
}
