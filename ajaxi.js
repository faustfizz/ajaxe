jQuery(function($) {
	$(document).on('submit', '.ajaxi-submit', ajaxi);
	$(document).on('change', '.ajaxi-change', ajaxi);
	$(document).on('click', '.ajaxi-click', ajaxi);

	var timeouts = {};

	function ajaxi(e) {
		e.stopPropagation();
		e.preventDefault();

		var self = $(this);
		var form = self.serialize() || self.find('*').serialize();
		var action = self.data('action') || self.prop('action') || '';
		var method = self.data('method') || self.prop('method') || 'post';

		if (self.data('confirm') && !confirm(self.data('confirm'))) {
			return;
		}

		$.ajax({
			'url': action,
			'data': form,
			'method': method,
			'dataType': self.data('type') || 'json',
			'success': function(data, statusText, jqXHR) {
				if (self.data('feedback') && 'systemMessages' in data) {
					var feedback = $(self.data('feedback'));
					feedback.html(data.systemMessages);

					if (self.data('animation') != 0) {
						feedback.trigger('expand.feedback.ajaxi');
						feedback.slideDown(self.data('animation') || 400, function() {
							feedback.trigger('expanded.feedback.ajaxi');
						});
					}

					if (self.data('timeout') != 0) {
						if (timeouts[self.data('feedback')]) {
							clearTimeout(timeouts[self.data('feedback')]);
							delete timeouts[self.data('feedback')];
						}
						var timerId = setTimeout(function() {
							if (self.data('animation') != 0) {
								feedback.trigger('collapse.feedback.ajaxi');
								feedback.slideUp(self.data('animation') || 400, function() {
									feedback.trigger('collapsed.feedback.ajaxi');
								});
							}
						}, self.data('timeout') || 10000);
						timeouts[self.data('feedback')] = timerId;
					}
				}

				if (self.data('content') && 'htmlContent' in data) {
					$(self.data('content')).html(data.htmlContent);
				}

				if (data.status == 'success') {
					self.trigger('success.ajaxi', [data, statusText, jqXHR]);
				}
				else {
					self.trigger('error.ajaxi', [data, statusText, jqXHR]);
				}
			},
			'error': function(jqXHR, statusText, errorText) {
				console.log('ajaxi status:', statusText, errorText);

				self.trigger('error.ajaxi', [{
					'errors': [errorText],
				}, statusText, jqXHR]);
			},
		});
	}
});
