/************ script for action game ***********/
var action_list = [
    {name: 'ร้องเพลง "คุกกี้เสี่ยงทาย" ด้วยอักษรด.เด็ก', prize: 'ขนมคุกกี้ 1 กล่อง', brand: 'เบอร์เกอร์'},
    {name: 'ป้อนขนมที่แพงที่สุดให้พี่โป้ง ด้วยท่าที่ครีเอทที่สุดในชีวิต', prize: 'แผ่นแปะบรรเทาอาการปวด 1 ชิ้น', brand: 'ไส้กรอก'},
    {name: 'แนะนำตัวแบบมิสแกรนด์ ด้วยชื่อจริง พร้อมชื่อเขตที่ตัวเองอยู่', prize: 'สายสะพายส่งตรง จากเซเว่น', brand: 'แซนวิช'},
    {name: 'ออกมาร้องคาราโอเกะเพลงต่อไปนี้', prize: 'ลำโพง JBL Go 1 เครื่อง', brand: 'กาแฟ'},
    {name: 'ถ่ายแบบคู่กับพี่มาร์คตามภาพนี้ <img src="images/postgame.png" />', prize: 'ซองขาวปริศนา', brand: 'กัฟ'},
    {name: 'เรียกหมายเลข 7 และ 11 มาแข่งเกมพูดประโยค "รับขนมจีบซาลาเปาเพิ่มไหมค้า" ใครยาวที่สุดรับรางวัลไปเลย', prize: 'น้ำขิงจำนวน 1 กล่อง', brand: 'สเลอปี้'},
    {name: 'เลือกเพื่อน 1 หนึ่งคน แข่งเกมลิสต์รายชื่อ', prize: 'ทองคำ 1 สลึง', brand: 'ขนมจีบ'},
    {name: 'จงตอบคำถามต่อไปนี้ "คุณคิดว่า Social Movement อะไรที่เด่นชัดที่สุดในประเทศไทย"', prize: 'Set เครื่องดื่มบำรุงสมอง', brand: 'ซาลาเปา'},
    {name: 'เล่นเกม "ทิศตรงข้าม" แข่งกับพี่กล้า ใครชนะ 3 ใน 5 ได้รับของรางวัลไปเล้ย', prize: 'Set ยาดมทุกยี่ห้อใน 7-11', brand: 'แสตมป์เซเว่น'},
];

var name_list = [1, 3, 4, 5, 6, 7, 8, 10,
    11, 12, 13, 14, 15, 16, 18, 19, 20,
 23, 24, 25, 26, 27, 28, 29]


$('.btnRandom').on('click', function(e) {
    $('#random .num').addClass('blur');

var i = 1;                     //  set your counter to 1
var j = 1;
var end = parseInt(Math.random())+30;




function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
        var rannum = parseInt(Math.random()*name_list.length);
        var shownum = name_list[rannum]
        if(shownum.toString().length == 1)
            shownum = "0"+name_list[rannum]
      $('#random .num').text( shownum );
    //   console.log('change');
      i++;                     //  increment the counter
      if (i < end) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      } else {                        //  ..  setTimeout()
        name_list.splice(rannum, 1);
        $('#random .num').removeClass('blur');
      }
      
   }, (j++)*10)
}
myLoop();                      //  start the loop
})

$('.showrandom').on('click', function(e) {
    $('#random').fadeIn();
})
$('.closeRandom').on('click', function(e) {
    $('#random').fadeOut();
})
var currentCard;
$('.frontcard').on('click', function(e) { //open card
    // $(this).data('id-card');
    var id = parseInt($(this).data('id-card'))-1;
    currentCard = id+1;
    var get_action = action_list[id];
    $('.title').text('คำสั่งประจำป้าย'+get_action.brand)
    $('.command').html(get_action.name);
    $('.prize').text(get_action.prize);
    $('.box-prize').show();
    $('#action').fadeIn();
})
$('.box-prize').on('click', function(e) {
    $(this).fadeOut();
    $('.prize').removeClass('hide');
});
$('.complete').on('click', function(e) {
    $('.frontcard.card-'+currentCard).css('opacity', '0.2');
    $('#action').fadeOut();
})
$('.close').on('click', function(e) {
    $('#action').fadeOut();
})