var currentCoords;

// Calculates the distance between two `[lat,lng]` tupels in km.
function calcHaversineDistance(coords1, coords2) {
  function convertDegToRad(deg) {
    return (deg * Math.PI / 180.0);
  }

  var dLat = convertDegToRad(coords2[0] - coords1[0])
  var dLng = convertDegToRad(coords2[1] - coords1[1])
  var lat1 = convertDegToRad(coords1[0])
  var lat2 = convertDegToRad(coords2[0])

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2)
  var dSigma = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return (6371 * dSigma);
}

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
        obj.key = 0.6213712 * calcHaversineDistance(currentCoords, restaurantCoords);
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
