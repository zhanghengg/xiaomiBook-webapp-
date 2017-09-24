var koa = require('koa');
var app = koa();
var controller = require('koa-route');
var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
var views = require('co-views');
var render = views('./view', {
    map: { html: 'ejs' }
});

app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}))


app.use(controller.get('/route_test', function*() {
    this.set('Cache-Control', 'no-cache')
    this.body = 'hello world'
}));
app.use(controller.get('/ejs_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', { title: 'title_test' });
}));
app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', { title: '书城首页' });
}));
app.use(controller.get('/search', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {});
}));
app.use(controller.get('/reader', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader', {});
}));
app.use(controller.get('/book', function*() {
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('book', { nav: '书籍详情', bookId: bookId });
}));
app.use(controller.get('/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', {});
}));
app.use(controller.get('/female', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', {});
}));
app.use(controller.get('/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', {});
}));
app.use(controller.get('/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', {});
}));
app.use(controller.get('/api_test', function*() {
    this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/search', function*() {
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_serch_data(start, end, keyword);
}));
app.use(controller.get('/ajax/index', function*() {
    this.body = service.get_index_data();
}));
app.use(controller.get('/ajax/rank', function*() {
    this.body = service.get_rank_data();
}));
app.use(controller.get('/ajax/category', function*() {
    this.body = service.get_category_data();
}));
app.use(controller.get('/ajax/bookbacket', function*() {
    this.body = service.get_bookbacket_data();
}));
app.use(controller.get('/ajax/female', function*() {
    this.body = service.get_female_data();
}));
app.use(controller.get('/ajax/male', function*() {
    this.body = service.get_male_data();
}));
app.use(controller.get('/ajax/chapter', function*() {
    this.body = service.get_chapter_data();
}));
app.use(controller.get('/ajax/book', function*() {
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = '';
    }
    this.body = service.get_book_data(id);
}));
app.use(controller.get('/ajax/data', function*() {
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.body = service.get_data_data(id);
}));
// app.use(controller.get('/ajax/search', function*() {
//     var querystring = require('querystring');
//     var params = querystring.parse(this.req._parsedUrl.query);
//     var keyword = params.keyword;
//     this.body = service.get_search_data(1, 100, keyword);
// }));
app.listen(3002);
console.log('koa server is started');