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

function sortRestaurants(sortKey) {
  var parent = document.getElementById("restaurant-overview");
  var children = parent.getElementsByClassName("restaurant");
  var ids = [];
  var obj, i;

  for (i = 0; i < children.length; i++) {
    obj = {};
    obj.element = children[i];
    var sortingParam = children[i].getAttribute("data-" + sortKey);
    if (sortKey == "location") {
      if (sortingParam) {
        var restaurantCoords = JSON.parse(sortingParam);
        obj.key =
          0.6213712 * calcHaversineDistance(currentCoords, restaurantCoords);
      } else {
        obj.key = 99999.0;
      }
    } else {
      obj.key = sortingParam;
    }
    ids.push(obj);
  }

  if (sortKey == "location") {
    // sort ascending
    ids.sort((a, b) => (a.key < b.key ? -1 : 1));
  } else {
    // sort descending
    ids.sort((a, b) => (a.key < b.key ? 1 : -1));
  }

  for (i = 0; i < ids.length; i++) {
    parent.appendChild(ids[i].element);
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
