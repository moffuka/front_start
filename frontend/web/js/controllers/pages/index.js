var indexPageController = new (PagesController.extend({

    setParams: function() {
        this.elem = '#wrap-index';
    },

    init: function() {
        var that = this;

        /*$(document).on('click', '.idx-button', function(e){  });*/
    },

    onRoute: function(params) {

    },

    onAfterLoad: function(params, load_in_background) {

    },

    onAfterShow: function(params, show_in_background) {
        if (!show_in_background) {

        }
    },

    onBeforeHide: function(params) {

    },

    onAfterDestroy: function(params) {

    },

    onParam: function(params, page_loaded) {
        var that = this;
        if (page_loaded) {

        }
    },

    onActivateAfterPopupClose: function(params) {

    },

    onDeactivateBeforePopupOpen: function(params) {

    },

    /***************************************************** COMMON *****************************************************/

}));




















