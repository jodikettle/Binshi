Meteor.S

Template.reportTemplate.helpers({
  exampleMapOptions: function() {
    var position = Geolocation.currentLocation();
    console.log(position);
	console.log(GoogleMaps.loaded());
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
Template.reportTemplate.events({
	'click input': function (event){
		var long =localStorage['lastLng'];
		var lat = localStorage['lastLat'];
		var notes = "no notes";
			console.log('Save Binshi');
			Binshis.insert({ created: Date.now(), long : long, lat: lat,notes : notes});
	}	
});