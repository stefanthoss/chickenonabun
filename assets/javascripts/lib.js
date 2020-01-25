// Calculates the distance between two `[lat,lng]` tupels in km.
function calcHaversineDistance(coords1, coords2) {
  function convertDegToRad(deg) {
    return (deg * Math.PI) / 180.0;
  }

  var dLat = convertDegToRad(coords2[0] - coords1[0]);
  var dLng = convertDegToRad(coords2[1] - coords1[1]);
  var lat1 = convertDegToRad(coords1[0]);
  var lat2 = convertDegToRad(coords2[0]);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  var dSigma = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return 6371 * dSigma;
}

module.exports = calcHaversineDistance;
