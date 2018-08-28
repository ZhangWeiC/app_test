$(function(){
	$('#slide').slideReveal({
		trigger: $('.trigger'),
	});

	let zObj = new Zoom('mask','search','m-close','search_logo');
	zObj.init();

	let tObj= new OpenTra('t-mask','chat_container','close_icon','refresh','main-btn');
	tObj.init();

	translation('#input_text','.message_pool','.send_btn');

});