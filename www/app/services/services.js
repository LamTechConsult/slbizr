SLBizReviews.service('CameraService', function($q,$cordovaCamera) {

   return {
      getPicture: function(options) {
        var q = $q.defer();

        $cordovaCamera.getPicture(options).then(function(imageURI) {
	        q.resolve(imageURI);
	    }, function(err) {
	        q.reject(err);
	    },options);
         return q.promise;
      }
   }
});

/**
 * BiZ Services :
 */
SLBizReviews.service('businessesService', function($q,$filter,$rootScope,$http,DrupalHelperService,DrupalApiConstant,DataService,UserResource,NodeResource,FileResource,CommentResource) {
    var businessesService = {
		  getBusinesses: getBusinesses,
		  getBusinessesReview:getBusinessesReview,
		  getBusinessesReviewById:getBusinessesReviewById,
		  sortBusinessesByDistance:sortBusinessesByDistance,
		  postReviews:postReviews,
		  getReviewerProfile:getReviewerProfile,
		  //setReviewUser:setReviewUser
		}
    var lastFetched = null;
    var businesses = null;
    var reviews = null;

    return businessesService;

//////////////////////////////////////////////////////////
	/**
	 * Get getReviewerProfile from backend.
	 */
	function getReviewerProfile(uid) {
		var reviewerProfile = null;
		var defer = $q.defer();
		UserResource.retrieve({uid:uid}).success(function (data) {
	 			reviewerProfile = data;
		    	defer.resolve(reviewerProfile);
		}).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}

	/**
	 * Post getBusinessesReviewById.
	 */
	 function getBusinessesReviewById(rid){
	 	console.log(rid);
	 	var defer = $q.defer();
	 	var reviewsDetails = '';
	 	if(reviews!==null){
	 		angular.forEach(reviews, function (value, key) {
	 			if(value.cid == rid){
	 				reviewsDetails = value;
	 			}
	 		});
	 		UserResource.retrieve({uid:reviewsDetails.uid}).success(function (data) {
	 			reviewsDetails.user = data;
		    	defer.resolve(reviewsDetails);
			}).catch(function (error) {
			    defer.reject(error);
			});
	 		
	 		//console.log(reviewsDetails);
	 	}else{
	 		defer.reject();
	 	}
	    return defer.promise;
	 }

	/**
	 * Post review to the business.
	 */
	function postReviews(reviewData){

		// var defer = $q.defer();
		// CommentResource.create(reviewData).success(function (data) {
		//     defer.resolve(data);
		// }).catch(function (error) {
		//     defer.reject(error);
		// });
	 	// return defer.promise;

    	return uploadImage()
	        .then(
	        function (result) {
	          reviewData.field_ltc_biz_photos = DrupalHelperService.structureField({fid: result.data.fid});
	        },
	        function (error) {
	        	alert('error:'+JSON.stringify(error));
	          //resolve without image
	          return $q.resolve(true);
	        })

	        .finally(
	        function () {
	        	//console.log(reviewData);
	          return CommentResource.create(reviewData);
	        });
   
		//returns promise
	    // - resolve after saved image to server
	    // - rejects if saving image fails or no image given
	    function uploadImage() {
	        //if data is given
	        if ($rootScope.pictureURL) {
	     	
	          var imgData = $rootScope.pictureURL;
	          delete $rootScope.pictureURL;
	          //Create a new name for the photo
			  var d = new Date(),
			      n = d.getTime(),
			      newFileName = n + ".jpg";
			      
	          var newImage = {};

	          newImage.file = imgData;
	          newImage.filename = newFileName;
	          newImage.filesize = newImage.file.length;
	          newImage.filepath = 'photos/biz/reviews/';
	          newImage.filemime = "image/jpeg",
	          newImage.image_file_name = newFileName;

	          return FileResource.create(newImage);
	        }
	        //else fail
	        return $q.reject(false);
	    }
    }

	/**
	 * Get active business reviews from backend.
	 */
	function getBusinessesReview(bid) {
			
		var defer = $q.defer();
		NodeResource.comments({nid: bid}).success(function (data) {
			reviews = data;	 
		    //console.log(data.length);
		    if (reviews.length != 0) {
            	prepareReviews(data);
            	console.log(reviews);
          	}
		    defer.resolve(reviews);
	    }).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}

	function prepareReviews(reviews){
		angular.forEach(reviews, function (value, key) {
			if("field_ltc_biz_photos" in reviews[key] && "und" in reviews[key].field_ltc_biz_photos) {
				angular.forEach(reviews[key].field_ltc_biz_photos.und, function (value, key1) {

			        var imgPath = reviews[key].field_ltc_biz_photos.und[key1].uri.split('//')[1].replace(/^\/+/, "");
			        reviews[key].field_ltc_biz_photos.und[key1].imgPath = DrupalHelperService.getDrupalPath()+'sites/default/files/' + imgPath;
			       //console.log(reviews[key].field_ltc_biz_photos.und[key1].imgPath);
	        	});
			}
		});
    	return reviews;
	}




	/**
	 * Get active business from backend.
	 */
	function getBusinesses() {
			
		var defer = $q.defer();
		if (businesses == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchBusinesses().success(function (data) {
		       //businesses = data;
		       saveBizDistance(data);
			       
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
	/**
	 * Add distance field to the populated business data.
	 */
	function saveBizDistance(bizData) {
	    var prepareBizData = bizData;
	   	for (a=0;a<prepareBizData.nodes.length;a++){
	 		prepareBizData.nodes[a].node.distance = $filter('distance')($rootScope.storage.lat,$rootScope.storage.long,prepareBizData.nodes[a].node.geocode_lat,prepareBizData.nodes[a].node.geocode_long,"N");
	 	}   
	    sortBusinessesByDistance(prepareBizData);
	}
	/**
	 * Sort bussiness according to user location.
	 */
	function sortBusinessesByDistance(sortBizData) {
		var sortedBizData = sortBizData;
	   	for (a=0;a<sortedBizData.nodes.length;a++){
	   		for (b=a+1;b<sortedBizData.nodes.length;b++){
	   			bsA=sortedBizData.nodes[a].node;
	   			bsB=sortedBizData.nodes[b].node;
	   			if (bsA.distance>bsB.distance){
	   				tmp=sortedBizData.nodes[a].node;
	   				sortedBizData.nodes[a].node=bsB;
	   				sortedBizData.nodes[b].node=tmp;
	   			}
	   		}
	   	}
	   	businesses = sortedBizData;
	}	
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
	
	return myAccountService;
////////////////////////////////////////////////////////////////////////////////

	/**
	 * Get my friends from backend.
	 */
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

	/**
	 * Get my Followers from backend.
	 */
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
	/**
	 * Get my Followings from backend.
	 */
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
	/**
	 * Get my Messages from backend.
	 */
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
	/**
	 * Get my Bookmarks from backend.
	 */
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
});
