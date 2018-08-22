$(window).load(function(){
    $('body').addClass('loaded');
    $('#loader-wrapper .load_title').remove();

    $('#slide').slideReveal({
		trigger: $('.trigger'),
	});

	let zObj = new Zoom('mask','search','m-close','search_logo','s_input');
	zObj.init();     
});
