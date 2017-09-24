new Vue({
    el: '#app',
    data: {
        search: [],
        conditon: true,
        empty: false
    },
    methods: {
        doSearch: function() {
            var _this = this;
            keyword = $('#search').val();
            $.get('/ajax/search', { keyword: keyword }, function(d) {
                _this.condition = false;
                _this.search = d.items;
                if (_this.search.length == 0) {
                    _this.empty = true;
                } else {
                    _this.empty = false;
                }
            }, 'json')
        }
    }
})