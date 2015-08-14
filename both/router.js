Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.map( function () {
  this.route('MyRoute', {
    waitOn: function() {
      return IRLibLoader.load("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    }
  });
});

Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['report', 'find'] });

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('find');
  this.route('report');
    this.route('thanks');
  });
