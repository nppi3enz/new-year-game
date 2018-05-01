/* โหลด Express มาใช้งาน */
var express = require('express');
var app = express();
var path = require('path');
var pug = require('pug');
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
// ประกาศให้ Express ใช้งาน View โดยให้ใช้โฟลเดอร์ views เป็นตัวเก็บไฟล์ jade.
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
 
// ตั้งค่าให้ Express ใช้ View Engine ชื่อว่า Jade
app.set('view engine', 'pug');
 
/* ใช้ port 7777 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */
var port = process.env.PORT || 7777;

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
// var server = app.listen(port, function() {
//     console.log('Starting node.js on port ' + port);
// });
 
/* Routing */
app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});
app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});
app.get('/game1', function (req, res) {
    res.render('game1/game.pug');
});
app.get('/game2', function (req, res) {
    res.render('game2/base.pug');
});
app.get('/game2/admin', function (req, res) {
    res.render('game2/admin.pug');
});
app.get('/game3', function (req, res) {
    res.render('game3/base.pug');
});
app.get('/game3/admin', function (req, res) {
    res.render('game3/admin.pug');
});
app.get('/spin', function (req, res) {
    res.render('spin/index.pug')
})
app.get('/spin', function (req, res) {
    res.render('spin/index.pug')
})
app.get('/random', function (req, res) {
    res.render('etc/random.pug')
})

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('User connected');
    socket.on('jigsaw', function(message) {
        // แสดงข้อมูลที่ได้ ออกมาทาง console
        // console.log(message);
        io.emit('jigsaw', message);
    });

    socket.on('set-jigsaw', function(message) {
        // console.log('SET JIGSAW: '+message);
        io.emit('set-jigsaw', message);
    });
    socket.on('set-cash', function(message) {
        io.emit('set-cash', message);
    });
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('User disconnected');
    });
 });
 
 http.listen(3000, function() {
    console.log('listening on *:3000');
 });