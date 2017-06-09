var PopupController = BasePagesController.extend({

    parentPage: '',

    getParentPage: function() {
        if (this.parentPage != '') {
            return this.parentPage;
        } else {
            return indexPageController;
        }
    },

    pageChanged: function(){
        var that = this;

        // изменился урл и это касается текущей страницы
        if (that.getElem().attr('data-page') === router.get('now')) {

            that.onRoute(router.get('params'));

            // попап не виден на экране
            if (!that.getElem().isVisible()) {

                // или если сейчас нужно открыть попап, а у нас под ним ничего не лежит
                if ($('.b-page[data-page-type="page"]').filterVisible().length == 0) {

                    // грузим данные попапа
                    that.updateViewContent(function(){
                        that.onAfterLoad(router.get('params'), false);

                        router.set('page_showing', true);

                        // и показываем сам попап
                        that.showPage(function () {
                            router.set('page_showing', false);
                            that.onAfterShow(router.get('params'), false);
                        });

                        // открываем дефолтную страницу под попапом
                        that.getParentPage().updateViewContent(function () {
                            that.getParentPage().onAfterLoad(router.get('params'), true);
                            that.getParentPage().onDeactivateBeforePopupOpen(router.get('params'));

                            // показываем ее
                            that.getParentPage().showPage(function () {
                                that.getParentPage().onAfterShow(router.get('params'), true);
                            });
                        });
                    });
                }
                // все нормально, просто грузим попап
                else {
                    that.updateViewContent(function(){
                        that.onAfterLoad(router.get('params'), false);

                        router.set('page_showing', true);

                        // и показываем
                        that.showPage(function () {
                            router.set('page_showing', false);
                            that.onAfterShow(router.get('params'), false);
                        });
                    });
                }
            }
        }
        // изменился урл и это не наша вьюха
        else {
            // этот попап сейчас на экране - прячем его
            if (that.getElem().isVisible()) {
                that.onBeforeHide(router.get('params'));
                router.set('page_hiding', true);

                that.hidePage(function(){
                    router.set('page_hiding', false);
                    that.onAfterDestroy(router.get('params'));
                });
            }
        }
    },

    /*****************************************************************************************************************/

    beforeShow: function() {
        app.bgImgOnLoad();
        app.bgOnResize();

        $('body').removeClassRegExp('popup-').addClass('popup-' + router.get('now'));
    },

    showPage: function(callback) {
        var that = this;

        that.getElem().css({'z-index' : 100, opacity: '0', display : '' });
        that.beforeShow();

        app.animate(that.getElem(), { opacity: '1' }, 500, '', 0, function() {
            that.afterShow(callback);
        });
    },

    afterShow: function(callback) {
        var that = this;
        that.getElem().css({'z-index' : '', 'opacity' : '' });

        if (typeof callback === 'function') { callback(); }
    },

    /*****************************************************************************************************************/

    beforeHide: function() {

    },

    hidePage: function(callback) {
        var that = this;

        that.beforeHide();

        app.animate(that.getElem(), { opacity: '0' }, 500, '', 0, function() {
            that.afterHide(callback);
        });
    },

    afterHide: function(callback) {
        this.getElem().css({'z-index' : '', 'opacity' : '', 'display' : 'none' });
        if (!this.getElem().hasClass('b-page_no_load')) {
            this.getElem().html('');
        }

        if (typeof callback === 'function') { callback(); }
    }

});

