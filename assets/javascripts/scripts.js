var current_coords;

function position_success(position) {
  current_coords = [position.coords.latitude, position.coords.longitude];
  console.log("Current position is: " + current_coords); // TODO remove
  sortRestaurants("location");
}

function position_error(error) {
  console.warn("Could not get current position (" + error.code + "): " + error.message);
  window.history.back();
}

function sortRestaurants(sortKey) {
  var parent = document.getElementById("restaurant-overview");
  var children = parent.getElementsByClassName("restaurant");
  var ids = [],
    obj,
    i;

  for (i = 0; i < children.length; i++) {
    obj = {};
    obj.element = children[i];
    sort_param = children[i].getAttribute("data-" + sortKey);
    if(sortKey == "location") {
      restaurant_coords = sort_param.split(",");
      if(restaurant_coords.length == 2) {
        console.log(restaurant_coords); // TODO remove
        console.log(haversine(current_coords, restaurant_coords)); // TODO remove
      } else {
        obk.key = "";
      }
    } else {
      obj.key = sort_param;
    }
    ids.push(obj);
  }

  console.log(ids); // TODO remove

  ids.sort((a, b) => (a.key < b.key ? 1 : -1));

  for (i = 0; i < ids.length; i++) {
    parent.appendChild(ids[i].element);
  }
}

function sortEvent() {
  var sortKey;
  if (location.hash) {
    sortKey = location.hash.substr(1);
  } else {
    sortKey = "date";
  }

  if(sortKey == "location") {
    console.log("Special sorting by location") // TODO remove
    navigator.geolocation.getCurrentPosition(position_success, position_error);
  } else {
    sortRestaurants(sortKey);
  }

  document
    .getElementById("nav-bar")
    .querySelectorAll("a")
    .forEach(a => a.classList.remove("highlight"));
  document.getElementById(sortKey + "-link").classList.add("highlight");
}

if (window.location.pathname == "/") {
  window.onload = sortEvent;
  window.onhashchange = sortEvent;
}
