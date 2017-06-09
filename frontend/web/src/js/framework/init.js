$(document).ready(function() {

    $.fn.removeClassRegExp = function (regexp) {
        if (regexp && (typeof regexp === 'string' || typeof regexp === 'object')) {
            regexp = typeof regexp === 'string' ? regexp = new RegExp(regexp) : regexp;

            $(this).each(function () {
                $(this).removeClass(function (i, c) {
                    var classes = [];
                    $.each(c.split(' '), function (i, c) {
                        if (regexp.test(c)) {
                            classes.push(c);
                        }
                    });
                    return classes.join(' ');
                });
            });
        }
        return this;
    };

    $.fn.isVisible = function () {
        var selector = $(this).eq(0);
        return (selector.is(':visible') && selector.css('visibility') !== 'hidden' && parseFloat(selector.css('opacity')) > 0);
    };

    $.fn.filterVisible = function () {
        var selector = $(this);
        var selector_result = [];
        selector.each(function(idx, jq){
            if ($(jq).is(':visible') && $(jq).css('visibility') !== 'hidden' && parseFloat($(jq).css('opacity')) > 0) {
                selector_result.push(jq);
            }
        });
        return $(selector_result);
    };

    $(window).trigger('document_ready');

});