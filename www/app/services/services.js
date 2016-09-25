/**
 * BiZ Services :
 */
SLBizReviews.service('businessesService', function($q,$http,DrupalApiConstant,DataService,NodeResource) {
    var businessesService = {
		  getBusinesses: getBusinesses,
		  saveBusinessesData:saveBusinessesData,
		  getBusinessesReview:getBusinessesReview
		}
    var lastFetched = null;
    var businesses = null;
    var reviews = null;
	var defer = $q.defer();

//////////////////////////////////////////////////////////
	function getBusinessesReview(bid) {
		var defer = $q.defer();
			NodeResource
	          .comments({nid: bid})
	          .success(function (data) {
	          	reviews = data;
	          	console.log(data);
	            saveBusinessesReviewData(data);
	            defer.resolve(reviews);
	          })
	          .catch(function (error) {
	            defer.reject(error);
	          });
        return defer.promise;
	}
	function saveBusinessesReviewData(reviews) {
      var preparedReviews = reviews;
      for (a=0;a<reviews.length;a++){
        	startRating(reviews[a],'reviews');
        }
      reviews = preparedReviews;
    }
	function getBusinesses() {
		var defer = $q.defer();
		if (businesses == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchBusinesses().success(function (data) {
		       businesses = data;
		       saveBusinessesData(data);
		        defer.resolve(businesses);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(businesses);
		}
        return defer.promise;
	}
	function saveBusinessesData(Businesses) {
      var preparedBusinesses = Businesses;
      for (a=0;a<Businesses.nodes.length;a++){
        	startRating(Businesses.nodes[a].node,'businesses');
        }
      businesses = preparedBusinesses;
    }


    function startRating(bs,type) {
    	bs.starcount=[1,2,3,4,5];
        bs.starimage=[];

        if(type =='reviews' && angular.isObject(bs.field_ltc_biz_rating.und)){
        	bs.ratings = bs.field_ltc_biz_rating.und[0].rating;
        }
        
        if (bs.reviewcount>0){
            bs.starimage=["red-star","grey-star","grey-star","grey-star","grey-star"];
        }else{
            bs.starimage=["grey-star","grey-star","grey-star","grey-star","grey-star"];
        }
        
        if (bs.ratings){
            percentVal=parseFloat(bs.ratings);
            if (percentVal==20){
                //bs.starcount=[1];
                bs.starimage=["red-star","grey-star","grey-star","grey-star","grey-star"];
            }else if (percentVal==30){
                //bs.starcount=[1,2];
                bs.starimage=["red-star","half-red-star","grey-star","grey-star","grey-star"];
            }else if (percentVal==40){
                //bs.starcount=[1,2];
                bs.starimage=["yellow-star","yello-star","grey-star","grey-star","grey-star"];
            }else if (percentVal==50){
                //bs.starcount=[1,2,3];
                bs.starimage=["yellow-star","yellow-star","half-yellow-star","grey-star","grey-star"];
            }else if (percentVal==60){
                //bs.starcount=[1,2,3];
                bs.starimage=["yellow-star","yellow-star","yellow-star","grey-star","grey-star"];
            }else if (percentVal==80){
                //bs.starcount=[1,2,3,4];
                bs.starimage=["green-star","green-star","green-star","green-star","grey-star"];
            }else if (percentVal==100){
                //bs.starcount=[1,2,3,4,5];
                bs.starimage=["green-star","green-star","green-star","green-star","green-star"];
            }
        }
    }
	return businessesService;	
});

/**
 * myAccountService :
 */
SLBizReviews.service('myAccountService', function($q,$http,DrupalApiConstant,DataService) {
	var myAccountService = {
		  getMyFriends: getMyFriends,
		  getMyFollowers:getMyFollowers,
		  getMyFollowings:getMyFollowings,
		  getMyMessages:getMyMessages,
		  getMyBookmarks:getMyBookmarks
	};
	var myFriends = null;
	var myFollowers = null;
	var myFollowings = null;
	var myMessages = null;
	var myBookmarks = null;
	
	
	var lastFetched = null;
	var defer = $q.defer();

	function getMyFriends(uid) {
		var defer = $q.defer();
		if (myFriends == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFriends(uid).success(function (data) {
		       myFriends = data;
		        defer.resolve(myFriends);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFriends);
		}
        return defer.promise;
	}


	function getMyFollowers(uid) {
		var defer = $q.defer();
		if (myFollowers == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchFollowers(uid).success(function (data) {
		        myFollowers = data;
		        defer.resolve(myFollowers);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowers);
		}
        return defer.promise;
	}
	function getMyFollowings(uid) {
		var defer = $q.defer();
		if (myFollowings == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFollowings(uid).success(function (data) {
		        myFollowings = data;
		        defer.resolve(myFollowings);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowings);
		}
        return defer.promise;
	}
	function getMyMessages(uid) {
		var defer = $q.defer();
		if (myMessages == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyMessages(uid).success(function (data) {
		         myMessages = data;
		         defer.resolve(myMessages);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myMessages);
		}
        return defer.promise;
	}
	function getMyBookmarks() {
		var defer = $q.defer();
		if (myBookmarks == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyBookmarks().success(function (data) {
		         myBookmarks = data;
		         defer.resolve(myBookmarks);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myBookmarks);
		}
        return defer.promise;
	}

	
	return myAccountService;
});
