var BaseModel = Backbone.Model.extend({

    defaults: {

    },

    initialize: function(){
        var that = this;

        $(window).on('document_ready', function() { that.init(); });
    },

    init: function() {

    }

});