// if (Meteor.isClient) {
	Template.MyAds.onRendered(function () {
		var google_adtest = "on";
		$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		//ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-72414***074839" data-ad-slot="4009***57" data-ad-format="auto"></ins>';
		ads = '<div class="fakeAdvert">Here is an add</div>';
		$('.leaderboard').html(ads);
		return (adsbygoogle = window.adsbygoogle || []).push({});
	   });
	});
// }