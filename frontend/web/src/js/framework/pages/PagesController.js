var PagesController = BasePagesController.extend({

    pageChanged: function(){
        var that = this;

        // изменился урл и это касается текущей вьюхи
        if (that.getElem().attr('data-page') === router.get('now')) {

            that.onRoute(router.get('params'));

            // вьюха не видна на экране
            if (!that.getElem().isVisible()) {

                // грузим ее
                that.updateViewContent(function () {
                    that.onAfterLoad(router.get('params'), false);

                    router.set('page_showing', true);

                    // и показываем
                    that.showPage(function () {
                        router.set('page_showing', false);
                        that.onAfterShow(router.get('params'), false);
                    });
                });
            }
            // вьюха видна на экране (возможно за попапом)
            else {
                setTimeout(function(){
                    that.onActivateAfterPopupClose(router.get('params'));
                }, 500);
            }
        }
        // изменился урл и это не наша вьюха
        else {
            if (that.getElem().isVisible()) {
                // но если та вьюха, которая изменилась - полноценная страница, а эта вьюха сейчас на экране - неплохо бы ее спрятать
                if ($('#wrap-'+router.get('now')).attr('data-page-type') === 'page') {
                    that.onBeforeHide(router.get('params'));
                    router.set('page_hiding', true);

                    that.hidePage(function(){
                        router.set('page_hiding', false);
                        that.onAfterDestroy(router.get('params'));
                    });
                }
                // если на фоне нашей вьюхи открылся попап - отсылаем ей событие
                else if ($('#wrap-'+router.get('now')).attr('data-page-type') === 'popup') {
                    that.onDeactivateBeforePopupOpen(router.get('params'));
                }
            }
        }
    },

    /*****************************************************************************************************************/

    beforeShow: function() {
        app.bgImgOnLoad();
        app.bgOnResize();
    },

    showPage: function(callback) {
        if ($('#wrap-preloader').hasClass('b-preloader_visible')) {
            this.showPageAfterPreloader(callback);
        } else {
            this.showPageNormal(callback);
        }
    },

    showPageAfterPreloader: function(callback) {
        var that = this;

        that.getElem().css({'opacity' : '', 'display' : '' });
        that.beforeShow();

        setTimeout(function(){
            that.afterShow(callback);
        }, 500);
    },

    showPageNormal: function(callback) {
        var that = this;
        var now = router.get('now') || '';
        var old_now = router.get('old_now') || '';
        var now_index = $('#wrap-' + now).index();
        var old_now_index = $('#wrap-' + old_now).index();

        var next_page_wrap_in = '';
        if (now_index > old_now_index) {
            that.getElem().css({ 'z-index' : 50, 'transform' : 'translate(0, 100%)', 'display' : '' });
            next_page_wrap_in = -100;
        } else {
            that.getElem().css({ 'z-index' : 50, 'transform' : 'translate(0, -100%)', 'display' : '' });
            next_page_wrap_in = 100;
        }

        that.beforeShow();

        app.animate($('.b-page_wrap_in'), { 'transform' : 'translate(0, '+next_page_wrap_in+'%)' }, 500, 'ease-in-out', 0, function() {
            that.afterShow(callback);
        });
    },

    afterShow: function(callback) {
        var that = this;

        setTimeout(function(){
            $('.b-page_wrap_in').css({ 'transform': '' });
            that.getElem().css({ 'opacity': '', 'z-index': '', position: '', 'transform': '' });

            if (typeof callback === 'function') { callback(); }
        }, 300);
    },

    /*****************************************************************************************************************/

    beforeHide: function() {

    },

    hidePage: function(callback) {
        var that = this;
        var now = router.get('now') || '';
        var old_now = router.get('old_now') || '';

        that.beforeHide();

        setTimeout(function(){
            that.afterHide(callback);
        }, 700);
    },

    afterHide: function(callback) {
        this.getElem().css({'z-index' : '', 'opacity' : '', position : '', 'display' : 'none' });
        if (!this.getElem().hasClass('b-page_no_load')) {
            this.getElem().html('');
        }

        if (typeof callback === 'function') { callback(); }
    }

});

