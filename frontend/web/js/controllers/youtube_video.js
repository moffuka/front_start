var youtubeVideoController = new (BaseController.extend({

    init: function(){
        var that = this;

        $(document).on('click', '.js-youtube_close', function(e){ that.closeVideo(this); });
    },




    /****************************************** COMMON ************************************************/

    yt_player: null,

    playVideo: function(yt_id) {
        var that = this;
        yt_id = yt_id || '';

        if (yt_id !== '') {
            $('.js-youtube_video').attr('data-youtube-id', yt_id);

            app.fadeIn('.b-youtube_popup', 300, {});
            setTimeout(function(){
                $('.js-youtube_video').resizer();
            }, 50);

            if (window.yt_player_loaded) {
                that.prepareVideo();
            } else {
                var interval = setInterval(function(){
                    if (window.yt_player_loaded) {
                        clearInterval(interval);
                        that.prepareVideo();
                    }
                }, 300);
            }
        }
    },

    prepareVideo: function() {
        var that = this;
        var yt_id = $('.js-youtube_video').attr('data-youtube-id') || '';

        if (window.yt_player_loaded && yt_id !== '') {
            that.yt_player = new YT.Player('yt_player', {
                height: '1280',
                width: '720',
                videoId: yt_id,
                playerVars: {
                    autohide : 1,
                    autoplay : 1,
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    html5: 1,
                    modestbranding : 1,
                    playsinline : 0
                },
                events: {
                    'onReady': function(e) { that.ytPlayerOnReady(e); },
                    'onStateChange': function(e) { that.ytPlayerOnStateChange(e); }
                }
            });
        }
    },

    ytPlayerOnReady: function(e) {

    },

    ytPlayerOnStateChange: function(e) {
        var that = this;

        // video ended
        if (that.yt_player.getPlayerState() == YT.PlayerState.ENDED) {

        }
        // start play
        else if (that.yt_player.getPlayerState() == YT.PlayerState.PLAYING) {

        }
        // video paused
        else if (that.yt_player.getPlayerState() == YT.PlayerState.PAUSED) {

        }
    },

    closeVideo: function() {
        app.fadeOut('.b-youtube_popup', 300, {}, function(){
            $('.js-youtube_video').attr('data-youtube-id', '').html('<div id="yt_player" class="b-youtube_video_in asd-wrap"></div>');
        });
        this.yt_player = null;
    }

}));



























