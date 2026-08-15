(function($) {
							$.fn.extend( {
								limiter: function(limit, elem) {
									$(this).on("keyup focus", function() {
										setCount(this, elem);
									});
									function setCount(src, elem) {
										var chars = src.value.length;
										if (chars > limit) {
											src.value = src.value.substr(0, limit);
											chars = limit;
										}
										var show_message=limit-chars;
										elem.html(show_message).css('color','red');
									}
									setCount($(this)[0], elem);
								}
							});
						})(jQuery);