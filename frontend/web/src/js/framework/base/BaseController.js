var BaseController = Backbone.View.extend({

    elem: '.elem',

    initialize: function(){
        var that = this;

        $(window).on('document_ready', function() {
            that.setParams();
            that.preInit();
            that.init();
        });
    },

    preInit: function() { },
    init: function() { },

    setParams: function() { },

    getElem: function() {
        return $(this.elem);
    }

});