Template.reportTemplate.helpers({
  exampleMapOptions: function() {
    var position = Geolocation.currentLocation();
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        zoom: 15
      };
    }
  }
});

Template.reportTemplate.onCreated(function() {

	console.log('Created');
  // We can use the 'ready' callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
	console.log('google maps is ready');
    // Add a marker to the map once it's ready
    var img_src = 'map_marker.png';
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: img_src,
      draggable:true
    });

		google.maps.event.addListener (marker, 'dragend', function (event) 
		{
		var point = marker.getPosition();

		// save location to local storage
		localStorage['lastLat'] = point.lat();
		localStorage['lastLng'] = point.lng();
	});
  });
});

// AutoForm.addHooks('deviceDetailsForm', {
  // onSuccess: function (formType, result) {
    // $('#deviceDetailsModal').modal('hide');
  // },
  // onError: function (formType, error) {
    // var code = error.error;
    // if (code) { // error from server
      // console.error(error);
    // }
  // },
// });

Template._myModal.events({
	'submit form': function (event,template){
			event.preventDefault();
			var long =localStorage['lastLng'];
			var lat = localStorage['lastLat'];
			var notes = event.target.description.value;
			
			//photo: $(e.target).find('[name=appPic]').val()
			
			Binshis.insert({ created: Date.now(), long : long, lat: lat, notes : notes, votes: '0' });
			
			Router.go('thanks');
	}	
});