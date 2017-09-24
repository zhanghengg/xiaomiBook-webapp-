var id = location.href.split('?id=').pop();
var windowWidth = $(window).width();
$.get('/ajax/book?id=' + id, function(d) {
    d.windowWidth = windowWidth;
    new Vue({
        el: '#app',
        data: d,
        methods: {
            readBook: function() {
                location.href = '/reader'
            }
        }
    })
}, 'json')