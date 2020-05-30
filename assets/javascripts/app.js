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
  window.history.back();
}

function extractSortKey(elements, sortKey) {
  var result = [];

  for (i = 0; i < elements.length; i++) {
    var obj = {};
    obj.element = elements[i];
    var sortingParam = elements[i].getAttribute("data-" + sortKey);
    if (sortKey == "location") {
      if (sortingParam) {
        var restaurantCoords = JSON.parse(sortingParam);
        obj.key = calcHaversineDistance(currentCoords, restaurantCoords);
      }
    } else {
      obj.key = sortingParam;
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
    elements.sort((a, b) => (a.key < b.key ? -1 : 1));
    elements.forEach(addDistanceLabel);
  } else {
    // sort descending
    elements.sort((a, b) => (a.key < b.key ? 1 : -1));
  }

  for (i = 0; i < elements.length; i++) {
    parent.appendChild(elements[i].element);
  }
}

function sortEvent() {
  var sortingKey;
  if (location.hash) {
    sortingKey = location.hash.substr(1);
  } else {
    sortingKey = "date";
  }

  if (sortingKey == "location") {
    navigator.geolocation.getCurrentPosition(sortRestaurantsByLocation, positionError);
  } else {
    sortRestaurants(sortingKey);
  }

  document.getElementById("sort-label").innerHTML = sortLabels[sortingKey];
}

if (window.location.pathname == "/") {
  window.onload = sortEvent;
  window.onhashchange = sortEvent;
}
