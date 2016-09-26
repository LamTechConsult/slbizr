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