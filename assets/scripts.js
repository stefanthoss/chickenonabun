function sortRestaurants(ordering) {
  var parent = document.getElementById("restaurant_overview");
  var children = parent.getElementsByClassName("restaurant");
  var ids = [],
    obj,
    i;

  for (i = 0; i < children.length; i++) {
    obj = {};
    obj.element = children[i];
    obj.sortKey = children[i].getAttribute(ordering);
    ids.push(obj);
  }

  ids.sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));

  for (i = 0; i < ids.length; i++) {
    parent.appendChild(ids[i].element);
  }
}

function sortEvent() {
  var sortKey;
  if (location.hash) {
    sortKey = location.hash.substr(1);
  } else {
    sortKey = "by_date";
  }

  sortRestaurants(sortKey);
  document
    .getElementById("navigation_bar")
    .querySelectorAll("a")
    .forEach(a => a.classList.remove("highlight"));
  document.getElementById(sortKey + "_link").classList.add("highlight");
}

if (window.location.pathname == "/") {
  window.onload = sortEvent;
  window.onhashchange = sortEvent;
}
