function sortRestaurants(sortKey) {
  var parent = document.getElementById("restaurant-overview");
  var children = parent.getElementsByClassName("restaurant");
  var ids = [],
    obj,
    i;

  for (i = 0; i < children.length; i++) {
    obj = {};
    obj.element = children[i];
    obj.key = children[i].getAttribute("data-" + sortKey);
    ids.push(obj);
  }

  if(sortKey != "location") {
    console.log("Regular sorting by " + sortKey) // TODO remove
    ids.sort((a, b) => (a.key < b.key ? 1 : -1));
  } else {
    console.log("Special sorting by location") // TODO remove

    function position_success(pos) {
      console.log("Current position is: " + pos.coords.latitude + "," + pos.coords.longitude);
    }

    function position_error(err) {
      console.warn("Could not get current position (" + err.code + "): " +err.message);
      // TODO forward to /#date
    }

    navigator.geolocation.getCurrentPosition(position_success, position_error);
  }

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

  sortRestaurants(sortKey);
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
