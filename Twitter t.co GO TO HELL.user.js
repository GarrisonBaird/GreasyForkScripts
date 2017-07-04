// ==UserScript==
// @name        Twitter t.co GO TO HELL
// @description Restore t.co links, support Twitter web/mobile/tweetdeck
// @icon        https://abs.twimg.com/favicons/favicon.ico
// @include     twitter.com
// @match       *://*.twitter.com/*
// @version     1.1
// @grant       none
// @namespace   https://greasyfork.org/users/113252-garrison-baird
// ==/UserScript==
// @updateURL   https://greasyfork.org/scripts/28506-twitter-t-co-go-to-hell/code/Twitter%20tco%20GO%20TO%20HELL.user.js
// @updateURL   https://github.com/GarrisonBaird/GreasyForkScripts/raw/master/Twitter%20t.co%20GO%20TO%20HELL.user.js


function main () {
	//document.querySelectorAll('a[href*="t.co"]').forEach(function (el) { // experimental forEach api in latest browsers
	Array.prototype.slice.call(window.document.querySelectorAll('a[href*="t.co"]'), 0) .forEach(function (el) {
		if (el.dataset && el.dataset.expandedUrl) { // Twitter web
			el.href = el.dataset.expandedUrl;
		}
		if (el.dataset && el.dataset.fullUrl) { // TweetDeck
			el.href = el.dataset.fullUrl;
		}
		if (el.children.length > 0 && el.children[0].tagName == "SPAN" && el.children[0].innerText.startsWith("(link: ")) {
			// Fucking Twitter mobile (https://mobile.twitter.com/)
			// el.children[0].innerText == "(link: https://www.google.com/) "
			var href = el.children[0].innerText.trim();
			href = href.substring("(link: ".length, href.length - ")".length);
			el.href = href;
		}
	});
};

main();
window.addEventListener('load', main);

if (window.location.host == 'tweetdeck.twitter.com') { // TweetDeck won't trigger 'scroll' event
  setInterval(main, 1000);
} else {
  window.addEventListener('scroll', main);
  setInterval(main, 10000); // fallback
}
