var app = new (BaseController.extend({

    setParams: function() {

    },

    init: function(){
        var that = this;

        // обработчики
        $(window).on('resize', function() { that.bgOnResize(); });

        $(document).on('click', '.js-popup_close', function(e){ that.popupHide(); });
        $(document).on('click', '.js-small_popup_close', function(e){ that.hideSmallPopup(this); });

        this.listenTo(router, 'change:now', this.pageChanged);
        this.listenTo(router, 'change:current_route', this.routeChanged);
        this.listenTo(preloaderModel, 'change:preloader_finished', this.appStart);

        $(document).on('keyup', function(e){ that.documentKeyPressed(e); });

        // on mouse wheel
        //$('body').mousewheel(function(event, delta, deltaX, deltaY) { that.onMouseWheel(deltaY); });

        // swype for mobile devices
        /*if (isMobile) {
            var hammertime = new Hammer($('body').get(0), {preventDefault: false});
            hammertime.on("drag", function(ev){
                ev.gesture.preventDefault();
            });
            hammertime.on("dragend", function(ev){
                if (ev.gesture.direction == 'up') {
                    that.onMouseWheel(-1);
                } else if (ev.gesture.direction == 'down') {
                    that.onMouseWheel(1);
                }
            });
        }*/

        // начальные значения
        that.bgImgOnLoad();
        that.bgOnResize();

        // analyticks
        that.gaInit();
    },

    x_data: '',







    /*********************************************************************** COMMON **********************************************************************************/

    bgOnResize: function() {
        this.updateOrientation();
        this.bgImgUpdate();
        this.baseFontUpdate();
    },

    bgImgUpdate: function() {
        $('.bg').resizer();
    },

    bgImgOnLoad: function() {
        $('img.bg').load(function(e){
            $(e.target).resizer();
        });
    },

    updateOrientation: function() {
        var window_width = $(window).width();
        var window_height = $(window).height();

        if ((window_width > window_height) && (window_width > 400) && (window_width/window_height > 1.2)) {
            if (isMobile && $('html').hasClass('html-portrait') && router.get('current_route').indexOf('rating/') > -1) {
                setTimeout(function(){
                    router.setPage('rating');
                }, 200);
            }

            $('html').removeClass('html-portrait').addClass('html-landscape');
            isLandscape = true;
            isPortrait = false;
        } else {
            if (isMobile && $('html').hasClass('html-landscape') && router.get('current_route').indexOf('rating') > -1) {
                setTimeout(function(){
                    router.setPage('rating/players');
                }, 200);
            }

            $('html').removeClass('html-landscape').addClass('html-portrait');
            isPortrait = true;
            isLandscape = false;
        }
    },

    baseFontUpdate: function() {
        var window_width = $('body').width();
        var window_height = $('body').height();

        if (isTablet) {
            $('html').css({'font-size': (window_height / 100)});
            if (isLandscape) {
                $('body').css({'font-size': Math.min(6, Math.min(6 * window_width / 1024, 6 * window_height / 768))});
            } else {
                $('body').css({'font-size': Math.min(7, Math.min(6.5 * window_width / 1152, 6.5 * window_height / 1536))});
            }
        } else if (isPhone) {
            $('html').css({'font-size': (window_height / 100)});
            if (isLandscape) {
                $('body').css({'font-size': Math.min(8, Math.min(15 * window_width / 1000, 8 * window_height / 1000))});
            } else {
                $('body').css({'font-size': Math.min(7, Math.min(6.5 * window_width / 960, 6.5 * window_height / 1440))});
            }
        } else {
            $('html').css({'font-size': (window_height / 100)});
            $('body').css({'font-size': Math.min(10, Math.min(10 * window_width / 1900, 10 * window_height / 1200))});
        }
    },

    animate: function(selector, css, time, easing, delay, callback) {
        if (ieNum > 9) {
            var _css = css;
            _css['transition'] = 'all ' + time + 'ms ' + ((easing == '') ? 'ease' : easing);

            setTimeout(function () {
                $(selector).css(_css);

                setTimeout(function () {
                    $(selector).css({ 'transition' : '' });
                    if (typeof callback === 'function') { callback(); }
                }, time + 50);
            }, delay + 50);
        } else {
            setTimeout(function(){
                $(selector).css(css);
                if (typeof callback === 'function') { callback(); }
            }, 200);
        }
    },

    fadeOut: function(selector, time, options, callback) {
        options = $.extend({
            easing : 'ease',
            delay: 0,
            change_visibility : false
        }, options);

        if ($(selector).is(':visible') && $(selector).css('visibility') !== 'hidden' && parseFloat($(selector).css('opacity')) > 0) {
            this.animate(selector, {'opacity': 0}, time, options.easing, options.delay, function () {
                if (!options.change_visibility) {
                    $(selector).css({'display': 'none', 'opacity': ''});
                } else {
                    $(selector).css({'visibility': 'hidden', 'opacity': ''});
                }

                if (typeof callback === 'function') { callback(); }
            });
        } else {
            if (typeof callback === 'function') { callback(); }
        }
    },

    fadeIn: function(selector, time, options, callback) {
        options = $.extend({
            easing : 'ease',
            delay: 0,
            change_visibility : false
        }, options);

        if ($(selector).is(':visible') && $(selector).css('visibility') !== 'hidden' && parseFloat($(selector).css('opacity')) > 0) {
            if (typeof callback === 'function') { callback(); }
        } else {
            $(selector).css({'display': '', 'visibility': '', 'opacity': 0});

            this.animate(selector, {'opacity': 1}, time, options.easing, options.delay, function () {
                $(selector).css({'opacity': ''});

                if (typeof callback === 'function') { callback(); }
            });
        }
    },






    /*************************************************************** ANALYTICKS EVENTS ***************************************************************************/

    gaInit: function() {

        // ----------------------------------- sharings ------------------------------------
        //$(document).on('click', '.idx-social', function(){ app.gaSend('button', 'index_share_click', $(this).attr('data-soc-type')); });

    },

    gaSend: function(category, action, label) {
        if (typeof ga !== 'undefined') {
            if (typeof label !== 'undefined' && label !== '') {
                ga('send', 'event', category, action, label);
            } else {
                ga('send', 'event', category, action);
            }
        }
        log('send', 'event', category, action, label);
    },





    /**************************************************************************************************************************************************************/

    appStart: function() {
        var that = this;

        setTimeout(function() {
            Backbone.history.start({ pushState : true });
        }, 0);
    },

    pageChanged: function() {
        var that = this;
        var now = router.get('now');
        var params = router.get('params');
        var page = $('.b-page[data-page="'+now+'"]');

        $('body').removeClassRegExp('page-').addClass('page-'+now);
    },

    routeChanged: function() {
        var that = this;
        var now = router.get('now');
        var current_route = router.get('current_route');
        var params = router.get('params');
        var page = $('.b-page[data-page="'+now+'"]');

        // analyticks
        if (typeof ga !== 'undefined') {
            ga('send', 'pageview', {
                'page': location.href
            });
        }
    },

    popupHide: function() {
        var visible_pages = $('.b-page[data-page-type="page"]').filterVisible();

        if (visible_pages.length > 0) {
            var route = $(visible_pages).eq(0).attr('data-last-route') || '';
            if (route == '') {
                route = $(visible_pages).eq(0).attr('data-route') || '';
            }
            router.setPage(route);
        }
    },

    documentKeyPressed: function(e) {
        var now = router.get('now');

        switch (e.keyCode) {
            case 27: // escape
                var visible_popup = $('.b-page[data-page-type="popup"]:visible');
                var small_popup_visible = $('.b-small_popup:visible');

                if (small_popup_visible.length > 0) {
                    small_popup_visible.eq(0).find('.js-small_popup_close').eq(0).click();
                } else if (visible_popup.length > 0) {
                    visible_popup.eq(0).find('.js-popup_close').eq(0).click();
                }
            break;
            case 38: // top

            break;
            case 40: // bottom

            break;
            case 37: // left

            break;
            case 39: // right

            break;
        }
    },

    showMessage: function(msg, _cb) {
        if (!_.isNull(msg) && (typeof msg !== 'undefined') && msg !== '') {
            $('.b-message_popup .b-message_popup_content_in').html(msg);
        }

        if ($('.b-message_popup').is(':hidden')) {
            app.fadeIn('.b-message_popup', 300, {}, function(){
                if (typeof _cb === 'function') { _cb(); }
            });
        } else {
            if (typeof _cb === 'function') { _cb(); }
        }
    },

    hideSmallPopup: function(_elem, _cb) {
        var elem = ($(_elem).length > 0) ? $(_elem).parents('.b-small_popup') : $('.b-small_popup:visible');

        if (elem.length > 0) {
            app.fadeOut(elem, 300, {}, function () {
                if (typeof _cb === 'function') { _cb(); }
            });
        } else {
            if (typeof _cb === 'function') { _cb(); }
        }
    },




    /***************************************** PAGES SCROLLING ******************************************************/

    scrollTimeout: 0,
    scrollBlocked: false,

    pageItems: {
        desktop: ['index']
    },

    onMouseWheel: function(deltaY) {
        var that = this;
        var _return = false;
        var now = router.get('now');
        var current_route = router.get('current_route');
        var params = router.get('params');
        var page = $('.b-page[data-page="'+now+'"]');
        var page_changing = router.get('page_hiding') || router.get('page_showing');
        var page_items = that.pageItems.desktop;

        if (
            page_changing ||
            $('.b-youtube_popup').isVisible()
        )
        {} else {
            // скролл заблокирован, продлеваем блокировку пока пользователь не перестанет скроллить
            if (that.scrollBlocked) {
                clearTimeout(that.scrollTimeout);
                that.scrollTimeout = setTimeout(function () {
                    that.scrollBlocked = false;
                }, 100);
            }
            else {
                // все нормально, скролл страниц
                if (!that.scrollBlocked) {
                    that.scrollBlocked = true;
                    clearTimeout(that.scrollTimeout);
                    that.scrollTimeout = setTimeout(function () {
                        that.scrollBlocked = false;
                    }, 100);

                    var new_index = that.myIndexOf(page_items, current_route);
                    if (new_index > -1) {
                        if (deltaY < 0) {
                            new_index++;
                        } else if (deltaY > 0) {
                            new_index--;
                        }
                    } else {
                        new_index = 0;
                    }

                    if (0 <= new_index && new_index < page_items.length) {
                        router.setPage(page_items[new_index]);
                    }

                    _return = true;
                }
            }
        }

        return _return;
    },

    myIndexOf: function(arr, str) {
        for (var i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) > -1) {
                return i;
            }
        }
        return -1;
    }

}));



























