var preloaderModel = new (BaseModel.extend({

    defaults: {
        images_preloaded : 0,
        all_images : 0,
        images : [

        ],

        images_deferred_preloaded : 0,
        all_deferred_images: 0,
        deferred_images: [],

        images_finished : false,
        preloader_finished : false
    },

    init: function() {
        var that = this;

        // init standard preloader
        that.initPreload();

        // on site ready - start deferred preload
        that.listenTo(that, 'change:images_finished', function(){
            that.set('preloader_finished', true);
        });
        that.listenTo(that, 'change:preloader_finished', function(){
            setTimeout(function(){
                if (!isMobile) {
                    that.initDeferred();
                }
            }, 2000);
        });
    },

    /************************************************ STANDARD PRELOAD **********************************************/

    initPreload: function() {
        var that = this;

        var file_name = 'img_desktop.json';
        if (isMobile) {
            file_name = 'img_mobile.json';
        }

        $.ajax({
            type : 'GET',
            url : '/json/'+file_name,
            dataType: 'json',
            cache: false,
            timeout : 10000,
            success : function(data) {
                // заполняем массив
                that.set('images', []);
                for (var i = 0; i < data.length; i++) {
                    that.get('images').push(data[i].replace('frontend/web/', ''));
                }

                // события
                that.set('all_images', that.get('images').length);

                // начальные значения
                that.nextImg();
                that.nextImg();
                that.nextImg();
                that.nextImg();
                that.nextImg();
            }
        });
    },

    nextImg: function() {
        var that = this;

        if (that.get('images').length > 0) {
            var img = new Image();
            var img_timeout = 0;
            var img_src = that.get('images')[0];

            var func = function() {
                that.set('images_preloaded', that.get('images_preloaded') + 1);
                clearTimeout(img_timeout);
                that.nextImg();
            };

            img.onload = func;
            img.onerror = func;
            img_timeout = setTimeout(function(){ func(); }, 500);
            that.get('images').splice(0, 1);

            img.src = '/' + img_src;
        } else {
            that.set('images_finished', true);
        }
    },

    /************************************************ DEFERRED PRELOAD **********************************************/

    initDeferred: function() {
        var that = this;

        $.ajax({
            type : 'GET',
            url : '/json/img_deferred.json',
            dataType: 'json',
            cache: false,
            timeout : 10000,
            success : function(data) {
                // заполняем массив
                that.set('deferred_images', []);
                for (var i = 0; i < data.length; i++) {
                    that.get('deferred_images').push(data[i].replace('frontend/web/', ''));
                }

                // события
                that.set('all_deferred_images', that.get('deferred_images').length);

                // начальные значения
                that.nextDeferred();
                that.nextDeferred();
                that.nextDeferred();
                that.nextDeferred();
                that.nextDeferred();
            }
        });
    },

    nextDeferred: function() {
        var that = this;

        if (that.get('deferred_images').length > 0) {
            var img = new Image();
            var func = function() {
                setTimeout(function(){
                    that.set('images_deferred_preloaded', that.get('images_deferred_preloaded') + 1);
                    that.nextDeferred();
                }, 20);
            };
            img.onload = func;
            img.onerror = func;
            img.src = '/' + that.get('deferred_images')[0];

            that.get('deferred_images').splice(0, 1);
        }
    }

}));
