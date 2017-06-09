var preloaderController = new (BaseController.extend({

    setParams: function() {
        this.model = preloaderModel;
        this.elem = '#wrap-preloader';
    },

    init: function() {
        var that = this;

        // Добавляем обработчики
        this.listenTo(this.model, 'change:images_preloaded', this.preloaderUpdate);
        this.listenTo(router, 'change:now', this.preloaderHide);

        // показываем прелоадер
        this.getElem().addClass('b-preloader_visible');
    },

    preloaderHide: function() {
        var that = this;

        app.animate(that.getElem(), {opacity: 0}, 500, '', 300, function () {
            that.getElem().hide().remove();
        });
    },

    preloaderUpdate: function() {
        var that = this;
        var percents = Math.min(100, Math.round((that.model.get('images_preloaded') / that.model.get('all_images')) * 100));

        //$('.b-preloader_bg_2').stop(true).animate({ 'opacity' : Math.max(0, ((100 - percents) / 100)) }, 'linear');
    }

}));























