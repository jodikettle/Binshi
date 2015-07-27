Binshis = new Meteor.Collection('binshis');

if (Meteor.isClient) {
Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/find', function () {
  this.render('FindTemplate');
});

Router.route('/report', function () {
  this.render('ReportTemplate');
});

Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
  console.log('test');
}, { only: ['report', 'find'] });

Template.findTemplate.helpers({
  exampleMapOptions: function() {
    var position = Geolocation.currentLocation();
if (position != undefined){
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        zoom: 15
      };
    }
  }
}
});

Template.findTemplate.onCreated(function() {
  // We can use the 'ready' callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
	console.log('adding this');
	var image_src = '/mapicon.png';
	var list = Binshis.find().fetch()
	for(i=0;i< list.length; i++)
	{

		var pos = new google.maps.LatLng(list[i].lat,list[i].long);
    		var marker = new google.maps.Marker({
      		position: pos,
      		map: map.instance,
		icon: image_src
    	});
	}
  });
});


Template.reportTemplate.helpers({
  exampleMapOptions: function() {
    var position = Geolocation.currentLocation();
    console.log(position);
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
  // We can use the 'ready' callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
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
	//Get Marker current position
    //var position = Geolocation.currentLocation();
	
	//var long = position.coords.longitude;
	//var lat = position.coords.latitude;

	var long =localStorage['lastLng'];
	var lat = localStorage['lastLat'];
	var notes = "no notes";
		console.log('Save Binshi');
		Binshis.insert({ created: Date.now(), long : long, lat: lat,notes : notes});
	}	
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
