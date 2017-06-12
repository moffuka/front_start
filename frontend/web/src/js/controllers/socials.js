var socials = new (BaseController.extend({

    init: function(){
        var that = this;

        $(document).on('click', '.b-footer_social', function(e){ that.sharingClick(this, {}); });
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

    sharingClick: function (elem, _meta, callback) {
        var that = this;
        callback = callback || function () {
            };
        var soc_type = $(elem).attr('data-soc-type') || '';

        var meta = $.extend({
            title: 'Veb Idea',
            descr: 'Veb Idea Descr',
            link : shareUrl,
            photo: shareUrl + '/img/socials/share.jpg',
        }, _meta);

        if (meta.photo.indexOf('http') == -1) {
            meta.photo = shareUrl + meta.photo;
        }

        if (soc_type != '') {
            var share_title = encodeURIComponent(meta.title);
            var share_descr = encodeURIComponent(meta.descr);
            var share_link = encodeURIComponent(meta.link);
            var share_image = encodeURIComponent(meta.photo);

            var link = '';
            switch (soc_type) {
                case 'fb':
                    link = 'https://www.facebook.com/dialog/feed?app_id=' + fb_app_id + '&display=popup&name=' + share_title + '&description=' + share_descr + '&picture=' + share_image + '&link=' + share_link + '&redirect_uri=' + share_link;
                    break;
                case 'vk':
                    link = 'http://vkontakte.ru/share.php?url=' + share_link + '&image=' + share_image + '&title=' + share_title + '&description=' + share_descr;
                    break;
                case 'ok':
                    link = 'https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.imageUrl=' + share_image + '&st.description=' + share_descr + '&st.shareUrl=' + share_link + '&st.title=' + share_title;
                    break;
                case 'tw':
                    link = 'https://twitter.com/intent/tweet?original_referer=' + share_link + '&tw_p=tweetbutton&url=' + share_link + '&text=' + share_title;
                    break;
            }

            var share_window = window.open(link, '_blank', that.getWindowFeatures());
            if (share_window) {
                var uri_regex = new RegExp(shareUrl);

                var watch_timer = setInterval(function () {
                    try {
                        if (share_window.closed) {
                            clearInterval(watch_timer);

                            callback();
                            return;
                        }
                        if (uri_regex.test(share_window.location)) {
                            clearInterval(watch_timer);

                            share_window.close();
                            callback();
                        }
                    } catch (e) {
                    }
                }, 200);
            } else {
                location.href = link;
                setTimeout(function () {
                    callback();
                }, 500);
            }
        }
    },




}));



























