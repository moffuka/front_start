/**
 *
 *  @preserve Copyright 2013
 *  Version: 0.22
 *  Licensed under GPLv2.
 *  Usage: $('.bg').resizer(options);
 *
 */
(function($){
    $.fn.resizer = function(options)
    {
        var j_image = this;

        options = $.extend({
            max_scale: 100,
            scale_mod: 'crop' // crop | fit
        }, options);

        return j_image.each(function(index, jqitem)
        {
            var j_container = $(jqitem).parent();
            var j_image = $(jqitem);



            var scale_type = (j_image.hasClass('bg-fit')) ? 'fit' : options.scale_mod;



            j_image.css({
                'position':'absolute',
                'top': '',
                'left': '',
                'width': '',
                'height': ''
            });




            var containerW = j_container.width();
            var containerH = j_container.height();

            var imageW = (typeof j_image.attr('r-width') !== 'undefined') ? parseInt(j_image.attr('r-width')) : j_image.width();
            var imageH = (typeof j_image.attr('r-height') !== 'undefined') ? parseInt(j_image.attr('r-height')) : j_image.height();

            var scale_Coef_X = Math.min(options.max_scale, containerW / imageW);
            var scale_Coef_Y = Math.min(options.max_scale, containerH / imageH);




            if (scale_type == 'fit') {
                scale_Coef_X = Math.min(scale_Coef_X, scale_Coef_Y);
                scale_Coef_Y = Math.min(scale_Coef_X, scale_Coef_Y);
            } else if (scale_type == 'crop') {
                scale_Coef_X = Math.max(scale_Coef_X, scale_Coef_Y);
                scale_Coef_Y = Math.max(scale_Coef_X, scale_Coef_Y);
            }

            imageW = imageW * scale_Coef_X;
            imageH = imageH * scale_Coef_Y;




            var c_left = 0;
            // Выровнять по правому краю
            if (j_image.hasClass('bg-right')) { c_left = containerW - imageW; }
            // по левому краю
            else if (j_image.hasClass('bg-left')) { c_left = 0; }
            // по центру (по умолчанию)
            else { c_left = (containerW - imageW) / 2; }




            var c_top = 0;
            // Выровнять по низу
            if (j_image.hasClass('bg-bottom')) { c_top = containerH - imageH; }
            // по верху
            else if (j_image.hasClass('bg-top')) { c_top = 0; }
            // по центру (по умолчанию)
            else { c_top = (containerH - imageH) / 2; }




            if (j_container.css('position') != 'absolute') {
                j_container.css({'position' : 'relative'});
            }




            j_image.css({
                'position':'absolute',
                'top': Math.floor(c_top),
                'left': Math.floor(c_left),
                'width': Math.floor(imageW),
                'height': Math.floor(imageH)
            });
        });
    };
})(jQuery);