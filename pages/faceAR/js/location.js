$(function(){

	$('.main-btn').click(function(){
		console.log(1);
		$('.main-btn').fadeOut(200);
		$('.main-intro').fadeOut(200);
		$('.main-upload').fadeIn(300);
	});
		

	$('.up-close').on('click',function(){
		$('.main-upload').fadeOut(200);
		$('.main-intro').fadeIn(300);
		$('.main-btn').fadeIn(300);
	});
});