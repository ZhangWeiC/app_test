$(function(){
	$('#slide').slideReveal({
		trigger: $('.trigger'),
	});

	let zObj = new Zoom('mask','search','m-close','search_logo');
	zObj.init();

});