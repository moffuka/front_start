var BasePagesController = BaseController.extend({

    preInit: function(){
        var that = this;

        // обработчики
        this.listenTo(router, 'change:prev_route', this.prevRouteChanged);
        this.listenTo(router, 'change:now', this.pageChanged);
        this.listenTo(router, 'change:params', this.paramsChanged);
    },

    updateViewContent: function(callback) {
        var that = this;
        var filename = that.getElem().attr('data-page');

        // if need to preload data from server
        if (!that.getElem().hasClass('b-page_no_load')) {

            that.getViewData(function(data) {
                that.getTemplate(filename, function(text) {
                    that.getElem().html(_.template(text, {
                        params: router.get('params'),
                        page: filename,
                        data: data,
                        header: _.template($('#header_template').html(), {}),
                        footer: _.template($('#footer_template').html(), {})
                    }));

                    if (typeof callback == 'function') { callback(); }
                });
            });

        } else {
            if (typeof callback == 'function') { callback(); }
        }
    },

    _template: '',
    getTemplate: function(filename, callback) {
        var that = this;

        if (that._template == '') {
            $.ajax({
                type: 'GET',
                url: '/js/views/' + filename + '.html',
                cache: false,
                timeout: 10000,
                success: function (text) {
                    that._template = text;

                    if (typeof callback == 'function') { callback(that._template); }
                }
            });
        } else {
            setTimeout(function(){
                if (typeof callback == 'function') { callback(that._template); }
            }, 50);
        }
    },

    prevRouteChanged: function() {
        if (this.getElem().attr('data-page') === router.get('old_now')) {
            this.getElem().attr('data-last-route', router.get('prev_route'));
        }
    },

    paramsChanged: function() {
        if (this.getElem().attr('data-page') === router.get('now')) {
            this.onParam(router.get('params'), (!router.get('page_showing') && this.getElem().html() != ''));
        }
    },

    // дополнительные данные для вьюхи
    getViewData: function(callback) {
        if (typeof callback == 'function') {
            callback({});
        }
    },

    // изменился параметр для этой страницы
    onParam: function(params, page_loaded) {},
    // закрылся попап и страница оказалась под ним
    onActivateAfterPopupClose: function(params) {},
    // открылся попап и страница оказалась под ним
    onDeactivateBeforePopupOpen: function(params) {},
    // изменился роут и это касается текущей страницы
    onRoute: function(params) {},

    // данные страницы загружены с сервера
    // load_in_background - страница загружена в фоне
    onAfterLoad: function(params, load_in_background) {},
    // страница показана на экране
    // show_in_background - страница показана в фоне
    onAfterShow: function(params, show_in_background) {},

    // изменился роут и страница сейчас будет скрываться
    onBeforeHide: function(params) {},
    // страница скрыта и данные удалены
    onAfterDestroy: function(params) {}

});

