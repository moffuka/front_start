var _debug_mode = true;

var isLandscape = false;
var isPortrait = false;
var isMobile = userAgentFindOne(["iPhone;", "iPad;", "iPod;", "android", "Mobile"]);
var isApple = userAgentFindOne(["iPhone;", "iPad;", "iPod;"]);
var isIpad = userAgentFindOne(["iPad;"]);
var isIphone = userAgentFindOne(["iPhone;"]);
var isAndroid = userAgentFindOne(["android"]);
var isAndroidDefault = isAndroid && userAgentFindOne(["Version/4"]);
var isAndroidOpera = isAndroid && userAgentFindOne(["OPR/"]);
var isYandex = userAgentFindOne(['YaBrowser']);
var isIpadSafariIos7 = navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !userAgentFindOne(["CriOS"]);
var isSafariIos7 = navigator.userAgent.match(/i*CPU.*OS 7_\d/i) && !userAgentFindOne(["CriOS"]);
var isMac = userAgentFindAll(["Macintosh"]);
var isSafariMac = userAgentFindAll(["Macintosh", "Safari"]) && !userAgentFindOne(["Chrome"]);
var isSafariMac9 = userAgentFindAll(["Macintosh", "Safari", "Version/9"]) && !userAgentFindOne(["Chrome"]);
var isSafariMac8 = userAgentFindAll(["Macintosh", "Safari", "Version/8"]) && !userAgentFindOne(["Chrome"]);
var isSafariMac7 = userAgentFindAll(["Macintosh", "Safari", "Version/7"]) && !userAgentFindOne(["Chrome"]);
var isSafariMac6 = userAgentFindAll(["Macintosh", "Safari", "Version/6"]) && !userAgentFindOne(["Chrome"]);
var isTablet = checkForTablet();
var isPhone = checkForPhone();
var isDesktop = !isTablet && !isPhone && !isMobile;
var ieNum = (function(){
                var undef,v = 3,div = document.createElement('div'),all = div.getElementsByTagName('i');
                while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);
                return v > 4 ? v : 100500;
            }());
if (ieNum == 100500 && userAgentFindOne(['Trident'])) {
    if (userAgentFindOne(["rv:11."])) {
        ieNum = 11;
    } else {
        ieNum = 10;
    }
}

if (ieNum == 100500 && userAgentFindOne(['Edge'])) {
    ieNum = 12;
}

var isWindowsPhone = userAgentFindAll(["Windows Phone", "IEMobile"]);

var isOldBrowser = (ieNum < 9) ||
                   userAgentFindAll(['Opera', 'Presto', 'Version/11']) ||
                   userAgentFindOne(['Opera 11', 'Opera 10']);

var isTouchSupported = 'ontouchstart' in window;

var html5VideoExt = (ieNum <= 12 || isSafariMac || isMobile) ? 'mp4' : 'webm';

if (isMobile) {
    if (isPhone) {
        document.write('<meta name="viewport" content="initial-scale=0.5, width=device-width" />');
    } else {
        document.write('<meta name="viewport" content="initial-scale=1, width=device-width" />');
    }
}




/******************************************* DOCUMENT CLASSES ***********************************************/

var htmlNode = document.html || document.getElementsByTagName('html')[0];
htmlNode.className = (isMobile ? 'html-mobile ' : '') +
                     (isTablet ? 'html-tablet ' : '') +
                     (isPhone ? 'html-phone ' : '') +
                     (isDesktop ? 'html-desktop ' : '') +

                     (isApple ? 'html-apple ' : '') +
                     (isIphone ? 'html-iphone ' : '') +
                     (isAndroid ? 'html-android ' : '') +
                     (isWindowsPhone ? 'html-windowsphone ' : '') +
                     (isIpadSafariIos7 ? 'html-ipadsafariios7 ' : '') +
                     (isTouchSupported ? 'html-touch ' : '') +

                     (isYandex ? 'html-yandex ' : '') +
                     (isOldBrowser ? 'html-oldbrowser ' : '') +

                     (isMac ? 'html-mac ' : '') +
                     (isSafariMac ? 'html-safari ' : '') +
                     (isSafariMac6 ? 'html-safari-6 ' : '') +
                     (isSafariMac7 ? 'html-safari-7 ' : '') +
                     (isSafariMac8 ? 'html-safari-8 ' : '') +
                     (isSafariMac9 ? 'html-safari-9 ' : '') +

                     ((ieNum < 100500) ? 'html-ie html-ie'+ieNum+' ' : '') +
                     ((ieNum <= 8) ? 'html-ie_old ' : '');






/************************************ CONSOLE LOG IE FIX ***********************************************/

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());





/******************************************* UTILS ***********************************************/

var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();

function log() {
    if (_debug_mode) {
        var args = Array.prototype.slice.call(arguments);
        console.log.apply(console, args);
    }
}

function userAgentFindOne(arr){
    var ua = navigator.userAgent;
    for (var i = 0; i < arr.length; i++) {
        if (Boolean(ua.match(new RegExp(arr[i],"i")))) {
            return true;
        }
    }
    return false;
}

function userAgentFindAll(arr) {
    var found = true;
    var ua = navigator.userAgent;
    for (var i = 0; i < arr.length; i++) {
        if (ua.indexOf(arr[i]) == -1) {
            found = false;
            break;
        }
    }
    return found;
}

function checkForTablet(){
    var sw = screen.width,
        sh = screen.height,
        dev_width = Math.min(sw, sh);

    return (isIpad ||
            (userAgentFindOne(["Tablet"]) && !userAgentFindOne(["Trident"])) ||
            userAgentFindOne(["Silk"]) ||
            (isAndroid && (dev_width >= 600)) ||
            (isMobile && (dev_width >= 600)));
}

function checkForPhone(){
    var sw = screen.width,
        sh = screen.height,
        dev_width = Math.min(sw, sh);
    return (isIphone || (isAndroid && (dev_width < 600)) || (isMobile && (dev_width < 600))) && !isIpad;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadScript(url, cb_success, cb_error) {
    cb_success = cb_success || function(){};
    cb_error = cb_error || function(){};

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    var deferred = $.Deferred();

    var t_out = 0;

    script.onload = function() {
        cb_success();
        deferred.resolve();
    };
    script.onerror = function() {
        cb_error();
        deferred.reject();
    };

    script.onreadystatechange = function() {
        var self = this;

        // получаен ответ - скрипт или ошибка. если за десять секунд не придется complete - вызываем error
        if (this.readyState == 'loaded') {
            t_out = setTimeout(function(){
                self.onerror();
            }, 10000);
        }

        // пришел complete - отменяем таймаут на error
        if (this.readyState == "complete") {
            clearTimeout(t_out);
            setTimeout(function() {
                self.onload();
            }, 0);
        }

    };

    head.appendChild(script);

    return deferred.promise();
}

function getEndingByDigit(arr, digit) {
    digit = digit | 0;
    digit = digit % 100;

    var digit_text = ((typeof arr[2] !== 'undefined') ? arr[2] : '');
    if (digit < 10 || 20 < digit) {
        if (digit % 10 == 2 || digit % 10 == 3 || digit % 10 == 4) {
            digit_text = ((typeof arr[1] !== 'undefined') ? arr[1] : '');
        } else if (digit % 10 == 1) {
            digit_text = ((typeof arr[0] !== 'undefined') ? arr[0] : '');
        }
    }

    return digit_text;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function templatizedStringParser(myTemplate, myString) {
    var vars = [];
    var parts = myTemplate.replace( /\[([^\]]+)]/g, function(str, name) {
        vars.push(name);
        return "~";
    }).split("~");

    parts.push('');

    var parser = function(myString) {
        var result = {};
        var remainder = myString;
        var i, index;
        var len = vars.length;

        for (i = 0; i < len; i++) {
            remainder = remainder.substring(parts[i].length);

            if (parts[i + 1] !== '') {
                index = remainder.indexOf(parts[i + 1]);
            } else {
                index = remainder.length;
            }

            result[vars[i]] = remainder.substring(0, index);
            remainder = remainder.substring(index);
        }

        return result;
    };

    return myString ? parser(myString) : parser;
}










/************************************** show/hide form errors **********************************************/

function clearGenericFormErrors(fel){
    fel.find('.js_field_error').parent().removeClass('invalid');
    fel.find('.js_field_error').remove();
    fel.find('.js_glob_error').hide().css('color', 'red').text('');
}

function showGenericFormErrors(fel, err){
    fel.find('.js_field_error').html('').hide();

    if (typeof err === 'object') {
        var msg_global = '';

        for (var i = 0; i < err.length; i++) {
            var msg = '';
            if (typeof err[i].message === 'string') {
                msg = err[i].message;
            }

            var errel = fel.find('.js_' + err[i].field + '_error');
            var inpel = fel.find('[name="' + err[i].field + '"]');

            if (errel.length == 1) {
                errel
                    .parent().addClass('invalid')
                    .find('.js_field_error').remove().end()
                    .append('<div class="error-msg js_field_error" style="color: red;">' + msg + '</div>');
            }
            else if (inpel.length == 1) {
                inpel
                    .parent().addClass('invalid')
                    .find('.js_field_error').remove().end()
                    .append('<div class="error-msg js_field_error" style="color: red;">' + msg + '</div>');
            }
            else {
                msg_global += msg + '<br>';
            }
        }

        if (msg_global !== '') {
            fel.find('.js_glob_error').html(msg_global).show();
        }
    } else if (err) {
        fel.find('.js_glob_error').text(err.details).show();
    } else {
        fel.find('.js_glob_error').text('ошибка').show();
    }
}








/******************************************* COOKIE ***********************************************/

function get_cookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function set_cookie(name, value, options) {
    options = options || {};

    // если не указан срок истечения - истекаем через год
    if (typeof options.expires == 'undefined') {
        options.expires = 30000000;
    }

    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    options.path = '/';

    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function delete_cookie(name) {
    set_cookie(name, "", { expires: -1 });
}



























