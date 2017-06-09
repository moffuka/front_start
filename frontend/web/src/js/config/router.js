var router = new (Backbone.Model.extend({

    defaults: {
        old_now: '',
        prev_route: '',

        now: '',
        current_route: '',

        params: {},

        page_showing: false,
        page_hiding: false,

        _router : ''
    },

    routes: {
        '':                                 'index_route',
        'index':                            'index_route',

        '*defaults':                        'other_route'
    },

    initialize: function() {
        var router = this;

        router.set('_router', new (Backbone.Router.extend({

            routes: router.routes,






            /****************************************** ROUTES ************************************************/

            index_route: function() {
                router.set('now', 'index');
                router.set('params', {});
            },








            /**********************************************************************************************/

            page_route: function(page) {
                router.set('now', page);
                router.set('params', {});
            },

            other_route: function(name) {
                // todo: доделать для роутов типа view/:id
                var b_page = $('.b-page[data-route="' + name + '"]');

                if (b_page.length > 0) {
                    this.page_route(b_page.attr('data-page'));
                } else {
                    this.index_route();
                }
            },

            /**********************************************************************************************/

            before: function(route, params) {
                router.set('old_now', router.get('now'));
                router.set('prev_route', router.get('current_route') || '');
            },

            after: function(route, params) {
                if (Backbone.history.fragment !== '') {
                    router.set('current_route', Backbone.history.fragment);
                } else if (router.get('now') !== '') {
                    router.set('current_route', router.get('now'));
                }
            }

        })));
    },

    /***************************************** SYSTEM ************************************************/

    setPage: function(page, _replace) {
        var that = this;
        _replace = (typeof _replace !== 'undefined' && typeof _replace == 'boolean') ? _replace : false;

        if (!that.get('page_showing') && !that.get('page_hiding')) {
            this.get('_router').navigate(page, { trigger : true, replace : _replace});
        }
    }

}));