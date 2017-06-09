<?php
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    } else {
        $protocol = 'http';
    }
    $URL = $protocol . "://" . $_SERVER['HTTP_HOST'];

    if ($_SERVER['HTTP_HOST'] == 'site.loc') {
        $fb_app_id = '1111111111111111';
    } else {
        $fb_app_id = '1111111111111111';
    }
?>