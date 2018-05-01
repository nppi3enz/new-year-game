/************ script for jigsaw game ***********/

$('.frontcard').on('click', function(e) {
    socket.emit('jigsaw', $(this).data('id-card'));
})
$('#resetBtn').on('click', function(e) {
    socket.emit('jigsaw', 'reset');
})
$('#clearBtn').on('click', function(e) {
    socket.emit('jigsaw', 'clear');
})
$('.load-img').on('click', function(e) {
    socket.emit('set-jigsaw', $(this).data('url'));
})
$('.sendCash').on('click', function(e) {
    socket.emit('set-cash', $('input[name=cash]').val());
})
$('.plusHundred').on('click', function(e) {
    $('input[name=cash]').val(parseInt($('input[name=cash]').val())+100);
})
$('.minusHundred').on('click', function(e) {
    $('input[name=cash]').val(parseInt($('input[name=cash]').val())-100);
})
var socket = io();
socket.on('jigsaw', function(message) {
    // แสดงผลข้อความที่ได้มาออกมาทางหน้าจอ
    
    if(message == 'reset') {
        $('.frontcard').show();
    } else if(message == 'clear') {
        $('.frontcard').hide();
    } else {
        // console.log('delete card: '+message);
        $('.frontcard.card-'+message).hide();
    }
    $('.status').text(message);
});
socket.on('set-jigsaw', function(message) {
    $('#container.solution').css('background-image', 'url("../images/'+message+'")');
});
socket.on('set-cash', function(message) {
    $('#prize .value').text(message);
});