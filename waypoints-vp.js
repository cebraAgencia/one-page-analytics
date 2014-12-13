;(function($){

    var DEBUG = false;

    var lastVirtual = false,
        current     = 0;

    var PaginaVirtual = function(element, options){

        var elem = $(element),
            obj = this,
            selector = '#'+elem.attr('id'),
            defaults = {
                url:            '/'+elem.attr('id'),
                pageTitle:      elem.attr('id'),
                triggerDelay:   2000,
                downPercentage: 0.6,
                upPercentage:   0.6,
                up: true,
                down: true
            };

        var settings = $.extend(defaults, options || {});

        this.triggerVirtualPage = function(elem,settings) {

            if(DEBUG){
                console.log(' -> call a virtual page '+settings.pageTitle+' ('+settings.url+') after '+settings.triggerDelay+' ms');
            }

            dataLayer.push({
                'event': '_d_GAVirtualPageview',
                'virtualPageview': settings.url,
                'virtualPageviewTitle': settings.pageTitle
            });
        };

        this.init = function(element, options){
            
            element.waypoint(function(direction) {
                if (settings.down && direction == 'down') {

                    if(DEBUG){
                        console.log('trigger: '+selector+' (down)');
                    }

                    var startTime   = new Date(),
                        scrollStart = startTime.getTime();
                    current = scrollStart;
                    
                    setTimeout(function(){
                        if (current == scrollStart && lastVirtual != selector) {
                            lastVirtual = selector;
                            obj.triggerVirtualPage(selector, settings);                                         
                        }
                    }, settings.triggerDelay);
                }
            }, {
                offset: function() {
                    ret =  (1 - settings.downPercentage) * parseInt($.waypoints('viewportHeight'));
                    return ret;
                }
            });
            
            element.waypoint(function(direction) {
                if (settings.up && direction == 'up') {
                    
                    if(DEBUG){
                        console.log('triggered: '+selector+' (up)');
                    }

                    var startTime   = new Date(),
                        scrollStart = startTime.getTime();
                    current = scrollStart;
                    
                    setTimeout(function() {
                        if (current == scrollStart && lastVirtual != selector) {
                            lastVirtual = selector;
                            obj.triggerVirtualPage(selector, settings);
                        }
                    }, settings.triggerDelay);
                }
            }, {
                offset: function() {
                    var addition = settings.upPercentage * parseInt($.waypoints('viewportHeight'));
                    var ret = - elem.height() + addition;
                    return ret;
                }
            });

        };
    };

    $.fn.paginaVirtual = function(options){
        return this.each(function(){
            var element = $(this);

            if (element.data('paginaVirtual')) return;

            var paginaVirtual = new PaginaVirtual(this, options);
            paginaVirtual.init(element, options);

            element.data('paginaVirtual', paginaVirtual);
        });
    };
})(jQuery);
