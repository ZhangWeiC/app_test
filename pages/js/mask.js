function Zoom(mask, search, close, search_logo, search_input){
	this.mask = mask;
	this.search = search;
	this.close = close;
	this.searchLogo = search_logo;
	this.searchInput = search_input;
}

Zoom.prototype = {
	init: function(){
		let that=this;
		this.searchClick();
		this.closeClick();	
	},
	searchClick:function(){
		let that=this;
		$("." + that.searchLogo).click(function(){
			$("#"+that.mask).fadeIn();
			$("."+that.search).fadeIn();
			$('.'+that.searchInput).focus();
		});
	},
	closeClick: function(){
		let that = this;
		$("#"+that.mask).click(function(){
			$(this).fadeOut();
			$('.'+that.searchInput).blur();
			$("."+that.search).fadeOut();
			$('.'+that.searchInput).val('');
		});
	},
}