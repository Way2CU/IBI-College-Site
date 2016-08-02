// create or use existing site scope
var Site = Site || {};

Site.PositionAnimation = function(elements) {
	var self = this;
	var elements = document.querySelectorAll(elements);
	self.elements = new Array();

	for(var i = 0; i < elements.length; i++) {
		self.elements.push(elements[i]);
	}

	/*
	 * object initialization 
	 */
	self._init = function() {
		window.addEventListener('scroll', self.scroll_event);
	};

	self.scroll_event = function(event) {
		if (self.elements.length == 0)
			return;

		// show list items
		var to_show = new Array();

		self.elements.forEach(function(element) {
			if (window.pageYOffset >= (element.offsetTop - (element.clientHeight / 2))) 
				element.classList.add('active'); else
				to_show.push(element);
		});

		// replace item list with new one
		self.elements = to_show;
	};

	// finish object initialization
	self._init();
}

$(function() {
	Site.scroll_features = new Site.PositionAnimation('section#features ul li');
	Site.scroll1 = new Site.PositionAnimation('article.what_you_get');
	Site.scroll2 = new Site.PositionAnimation('article.article_instructor');
	Site.scroll3 = new Site.PositionAnimation('section#subjects article');
});