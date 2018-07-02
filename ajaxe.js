(function ($) {
	$.fn.ajaxe = function(options) {
		var command = false;

		if (typeof options === 'undefined') {
			options = {};
		}
		else if (typeof options === 'string') {
			command = options;
			options = {};
		}

		return this.each(function() {
			var self = $(this);

			var opts = getOptions(self, options);

			if ('trigger' in opts) {
				self.on(opts.trigger, ajaxe, opts);
			}
		});
	};

	$.fn.ajaxe.defaults = {
		action: window.location.href,
		animation: 400,
		method: 'post',
		timeout: 10000,
		type: 'json',
	};

	jQuery(function($) {
		for (var k in document) {
			if (k.search('on') === 0) {
				var e = k.slice('2');
				$(document).on(e, '.ajaxe[data-trigger~="'+e+'"]', function(e) {
					var opts = getOptions($(this));
					ajaxe.call(this, e, opts);
				});
			}
		}
	});

	function ajaxe(e, opts) {
		e.stopPropagation();
		e.preventDefault();

		var self = $(this);
		var form = self.serialize() || self.find('*').serialize();

		if (opts.confirm && !confirm(opts.confirm)) {
			return;
		}

		$.ajax({
			'url': opts.action,
			'data': form,
			'method': opts.method,
			'dataType': opts.type,
			'success': function(data, statusText, jqXHR) {
				handleFeedback(data, opts);
				handleContent(data, opts);

				if (data.status == 'success') {
					self.trigger('success.ajaxe', [data, statusText, jqXHR]);
				}
				else {
					self.trigger('error.ajaxe', [data, statusText, jqXHR]);
				}
			},
			'error': function(jqXHR, statusText, errorText) {
				self.trigger('error.ajaxe', [{
					'errors': [errorText],
				}, statusText, jqXHR]);
			},
		});
	}

	var timeouts = {};

	function handleFeedback(data, opts) {
		if (!opts.feedback || !('feedback' in data)) {
			return;
		}
		var feedback = $(opts.feedback);
		feedback.html(data.feedback);

		if (opts.animation > 0) {
			feedback.trigger('expand.feedback.ajaxe');
			feedback.slideDown(opts.animation, function() {
				feedback.trigger('expanded.feedback.ajaxe');
			});
		}

		if (opts.timeout > 0) {
			if (timeouts[opts.feedback]) {
				clearTimeout(timeouts[opts.feedback]);
				delete timeouts[opts.feedback];
			}
			timeouts[opts.feedback] = setTimeout(function() {
				if (opts.animation > 0) {
					feedback.trigger('collapse.feedback.ajaxe');
					feedback.slideUp(opts.animation, function() {
						feedback.trigger('collapsed.feedback.ajaxe');
					});
				}
			}, opts.timeout);
		}
	};

	function handleContent(data, opts) {
		if (opts.content && 'content' in data) {
			$(opts.content).html(data.content);
		}
	}

	function getOptions(self, options) {
		if (typeof options === 'undefined') {
			options = {};
		}
		if (self.prop('action') && !self.data('action')) {
			options.action = self.prop('action');
		}
		if (self.prop('method') && !self.data('method')) {
			options.method = self.prop('method');
		}

		return $.extend({}, $.fn.ajaxe.defaults, self.data(), options);
	}
})(jQuery);
