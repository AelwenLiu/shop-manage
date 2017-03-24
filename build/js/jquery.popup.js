/*!
 * Copyright 2017 winslow wang
 */
(function ($) {
    $.fn.popup = function(options) {
        if(options.loading){
            if(options.loading == 'true') $('body').append('<div class="loading"></div>');
            if(options.loading == 'false') $('.loading').remove();
            return;
        }
        if(options.close){
            $('.mask').remove();
            $(options.container).fadeOut(200);
            return;
        }
        if($(this).length <= 0){
            $('body').append('<div class="mask"></div>');
            $(options.container).fadeIn(200);
        }else{
            $(this).click(function(){
                $('body').append('<div class="mask"></div>');
                $(options.container).fadeIn(200);
            });
        }
        $('body').on('click', '.mask, .close', function(){
            $('.mask').remove();
            $(options.container).fadeOut(200);
        });
    }
})(jQuery);