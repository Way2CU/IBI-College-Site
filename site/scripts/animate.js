
// create or use existing site scope
var Site = Site || {};

function animate(container, container_elements, trigger_element, delay_time) {
	var self = this;

	self.container = container;
	self.container_elements = null;
	self.position = trigger_element.offset().top -300;
	self.delay_time = delay_time;
	self.active = false;
	self._window = $(window);

	/*
	 * object initialization
	 */
	self._init = function() {
		// connect signals
		self._window.on('scroll', self.handle_scroll);
		
		// Find all container elements
		self.container_elements = self.container.find(container_elements);

	}

	self.handle_scroll = function(event) {
		//  position to trigger class on container elements
		var over_position = self._window.scrollTop() >= self.position;

		if (over_position && !self.active) {
			self.container_elements.each(function(index) {
				var item = self.container_elements.eq(index);
				if(!item.hasClass('active')){
					setTimeout(function() {
						self.handle_active(item);
					}, self.delay_time + (index * self.delay_time));
				}
			});

			self.active = true;
			self._window.off('scroll', self.handle_scroll);
		} 
	}

	//  function for adding active class
	self.handle_active = function(item) {
		item.addClass('active');
	}

	// finish object initialization
	self._init();
}

$(function() {
	Site.animate_features = new animate($('section#features'), $('section#features ul li'), $('div.form_container'), 200);
})