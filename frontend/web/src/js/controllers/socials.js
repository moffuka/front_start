var socials = new (BaseController.extend({

    init: function(){
        var that = this;

        $(document).on('click', '.b-footer_social', function(e){ that.sharingClick(this); });
        $(document).on('click', '.b-social', function(e){ that.sharingOtherClick(this); });
    },






    /********************************************** COMMON *********************************************/

    getWindowFeatures: function() {
        var screenX = (typeof window.screenX !== 'undefined') ? window.screenX : window.screenLeft;
        var screenY = (typeof window.screenY !== 'undefined') ? window.screenY : window.screenTop;
        var outerWidth = (typeof window.outerWidth !== 'undefined') ? window.outerWidth : document.body.clientWidth;
        var outerHeight = (typeof window.outerHeight !== 'undefined') ? window.outerHeight : (document.body.clientHeight - 22);
        var width = 960;
        var height = 640;
        var left = parseInt(screenX + ((outerWidth - width) / 2), 10);
        var top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);

        return 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';
    },







    /********************************************** SHARINGS ********************************************/

    sharingClick: function(elem, callback) {
        var that = this;
        var soc_type = $(elem).attr('data-soc-type') || '';

        if (soc_type != '') {
            var share_title = encodeURIComponent('Site Title');
            var share_descr = encodeURIComponent('Site Descr');
            var share_link = encodeURIComponent(baseUrl);
            var share_image = encodeURIComponent(baseUrl + '/img/socials/share.jpg');

            var link = '';
            switch (soc_type) {
                case 'fb':
                    link = 'https://www.facebook.com/sharer/sharer.php?u=' + share_link;
                    break;
                case 'vk':
                    link = 'http://vkontakte.ru/share.php?url='+share_link+'&image='+share_image+'&title='+share_title+'&description='+share_descr;
                    break;
                case 'ok':
                    link = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl='+share_link;
                    break;
                case 'tw':
                    link = 'https://twitter.com/intent/tweet?original_referer='+share_link+'&tw_p=tweetbutton&url='+share_link+'&text='+share_title;
                    break;
            }

            var share_window = window.open(link, '_blank', that.getWindowFeatures());
            if (share_window) {
                var uri_regex = new RegExp(baseUrl);

                var watch_timer = setInterval(function () {
                    try {
                        if (share_window.closed) {
                            clearInterval(watch_timer);

                            if (typeof callback == 'function') { callback(); }
                            return;
                        }
                        if (uri_regex.test(share_window.location)) {
                            clearInterval(watch_timer);

                            share_window.close();
                            if (typeof callback == 'function') { callback(); }
                        }
                    } catch (e) { }
                }, 200);
            } else {
                location.href = link;
                setTimeout(function(){
                    if (typeof callback == 'function') { callback(); }
                }, 500);
            }
        }
    },

    sharingOtherClick: function(elem, callback) {
        var that = this;
        var soc_type = $(elem).attr('data-soc-type') || '';

        if (soc_type != '') {
            var share_title = encodeURIComponent('Site Title');
            var share_descr = encodeURIComponent('Site Descr');
            var share_link = encodeURIComponent(baseUrl);
            var share_image = encodeURIComponent(baseUrl + '/img/socials/share.jpg');

            var link = '';
            switch (soc_type) {
                case 'fb':
                    link = 'https://www.facebook.com/dialog/feed?app_id='+fb_app_id+'&display=popup&name='+share_title+'&description='+share_descr+'&picture='+share_image+'&link='+share_link+'&redirect_uri='+share_link;
                    break;
                case 'vk':
                    link = 'http://vkontakte.ru/share.php?url='+share_link+'&image='+share_image+'&title='+share_title+'&description='+share_descr;
                    break;
                case 'ok':
                    link = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl='+share_link;
                    break;
                case 'tw':
                    link = 'https://twitter.com/intent/tweet?original_referer='+share_link+'&tw_p=tweetbutton&url='+share_link+'&text='+share_title;
                    break;
            }

            var share_window = window.open(link, '_blank', that.getWindowFeatures());
            if (share_window) {
                var uri_regex = new RegExp(baseUrl);

                var watch_timer = setInterval(function () {
                    try {
                        if (share_window.closed) {
                            clearInterval(watch_timer);

                            if (typeof callback == 'function') { callback(); }
                            return;
                        }
                        if (uri_regex.test(share_window.location)) {
                            clearInterval(watch_timer);

                            share_window.close();
                            if (typeof callback == 'function') { callback(); }
                        }
                    } catch (e) { }
                }, 200);
            } else {
                location.href = link;
                setTimeout(function(){
                    if (typeof callback == 'function') { callback(); }
                }, 500);
            }
        }
    }




}));



























