var currentCoords;

function positionSuccess(position) {
  currentCoords = [position.coords.latitude, position.coords.longitude];
  console.warn("Current position: " + currentCoords);
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
        distance = 0.6213712 * calcHaversineDistance(currentCoords, restaurantCoords);
        obj.key = distance;
        obj.element.getElementsByClassName("distance-indicator")[0].innerHTML = Math.round(distance) + " miles away";
      } else {
        obj.key = 99999;
      }
    } else {
      obj.key = sortingParam;
    }
    result.push(obj);
  }

  return result;
}

function sortRestaurants(sortKey) {
  var parent = document.getElementById("restaurant-overview");
  var children = parent.getElementsByClassName("restaurant");

  var elements = extractSortKey(children, sortKey);

  if (sortKey == "location") {
    // sort ascending
    elements.sort((a, b) => (a.key < b.key ? -1 : 1));
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
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  } else {
    sortRestaurants(sortingKey);
  }

  document
    .getElementById("nav-bar")
    .querySelectorAll("a")
    .forEach(a => a.classList.remove("highlight"));
  document.getElementById(sortingKey + "-link").classList.add("highlight");
}

if (window.location.pathname == "/") {
  window.onload = sortEvent;
  window.onhashchange = sortEvent;
}
