function OpenTra(mask, translation, close, refresh, tr_btn){
	this.mask = mask;
	this.translation = translation;
	this.close = close;
	this.refresh = refresh;
	this.trBtn = tr_btn;
}

OpenTra.prototype = {
	init: function(){
		this.trClick();
		this.closeClick();
		this.freshClick();
	},
	trClick:function(){
		let that=this;
		$("." + that.trBtn).click(function(){
			$("."+that.mask).fadeIn();
			$("#"+that.translation).fadeIn();
		});
	},
	closeClick: function(){
		let that = this;
		$("."+that.close).click(function(){
			$("."+that.mask).fadeOut();
			$("#"+that.translation).fadeOut();
			$('.src-input').val('');
			$('.dst-wrap').text('');
		});
	},
	freshClick: function(){
		let that = this;
		$('.'+that.refresh).click(function(){
			$('.src-input').val('');
			$('.dst-wrap').text('');
		});
	}
}

function translation(lSrc, lDst, btn){
	$(btn).click(function(){
		let query = $(lSrc).val();
		let reg = /\s+/g;
		// console.log(reg.test('absshhdn'));
		if( query=='' ){
			alert('不能输入为空');
			return;
		}else{
			let appid='20180725000188758';
			let key='GA8m2sF5H37YyPjEQykF';
			let salt = (new Date).getTime();
			let q = encodeURIComponent(query);
			let from = 'auto';
			let to = 'auto';
			let str1 = appid+query+salt+key;
			let sign = MD5(str1);

			$.ajax({
				url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
				type: 'get',
				dataType: 'jsonp',
				data: {
					q: query,
					appid: appid,
					salt: salt,
					from: from,
					to: to,
					sign: sign,
				},
				success:function(data){
					console.log(data);
					$(lDst).text('');
					let results=data.trans_result;
					for(let i in results){
						let content = decodeURIComponent(results[i].dst) + '<br>';
						$(lDst).append(content);
					}
				}
			});
		}
	});
}

