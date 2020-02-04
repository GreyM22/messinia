(function ($) {
    'use strict'; 
    window.demo_init = function (opts) {
        $('body').append('<div class="demo-preview-cont"></div>');
        var $bar = $('.demo-bar'); 
        var $previewCont = $('.demo-preview-cont');
        $previewCont.append('<img>');
        var $previewImg = $previewCont.find('img');
        function setPreviewPos($hovered) {
            $previewImg.attr('style', '');
            var wndW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var offset = 10;
            var w = parseFloat($previewImg.css('width'));
            var l = $hovered.closest('.demo-products-list-menu')[0].getBoundingClientRect().right + offset;
            var t = $bar[0].getBoundingClientRect().bottom + offset;
            if (wndW < l + w + offset) {
                w = wndW - l - offset;
            }
            $previewImg.css({ left: l + 'px', top: t + 'px', width: w + 'px' });
        }
    };
}($));