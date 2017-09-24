$.get('/ajax/index', function(d) {
    var windowWidth = $(window).width();
    if (windowWidth < 320) {
        windowWidth = 320;
    }
    new Vue({
        el: '#app',
        data: {
            screen_width: windowWidth,
            double_screen_width: windowWidth * 2,
            male: d.items[4].data.data,
        }

    })
}, 'json');