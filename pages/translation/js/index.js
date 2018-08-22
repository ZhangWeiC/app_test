$(function(){
	$('#slide').slideReveal({
		trigger: $('.trigger'),
	});

	let zObj = new Zoom('mask','search','m-close','search_logo');
	zObj.init();

	let tObj= new OpenTra('t-mask','container','all-close','all-fresh','main-btn');
	tObj.init();

	translation('.src-input','.dst-wrap','.src-btn');

});