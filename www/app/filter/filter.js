SLBizReviews.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail);
  };
});

// Setup the filter
SLBizReviews.filter('rating', function() {

  // Create the return function
  return function(rating) {
    if(angular.isUndefined(rating)){
      return '0';
    }
    // Ensure that the passed in data is a number
    numRating = parseInt(rating);
    if(numRating >= 20) {
      return numRating/20;
    } else {
       return numRating;
    }
  }
});

// Setup the filter
SLBizReviews.filter('ratingPercentage', function() {

  // Create the return function
  return function(rating) {
    if(angular.isUndefined(rating)){
      return '0%';
    }else{
      return rating+'%';
    }
  }
});

// Setup the filter
SLBizReviews.filter('distance', function() {

  // Create the return function
  return function(lat1, lon1, lat2, lon2, unit) {
    //console.log("lat1: "+lat1+"lon1: "+lon1+"lat2 :"+lat2+"lon2 :"+lon2+"unit :"+unit);
    if (lat1==0 || lon1==0){
      return 0;
    }
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    dist=parseFloat(Math.round(dist * 100) / 100);
    return dist;
  }
});