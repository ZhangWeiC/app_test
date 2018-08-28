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
			$("."+that.translation).fadeIn();
			$('#input_text').focus();
		});
	},
	closeClick: function(){
		let that = this;
		$("."+that.close).click(function(){
			$("."+that.mask).fadeOut();
			$("."+that.translation).fadeOut();
			$('#input_text').val('');
			$('.dst-wrap').text('');
			that.clearMsg();
		});
	},
	freshClick: function(){
		let that = this;
		$('.'+that.refresh).click(function(){
			$('#input_text').val('').focus();
			that.clearMsg();
		});
	},
	clearMsg: function(){
		$('.message_pool').empty().append(`
			<div class="left clearfix">
                <span class="left_icon"></span>
                <div class="left_message">
                    <div class="lArrow"></div>
                    Hi, I am your translator(^_^). Please enter Chinese or English and I'll translate for you~~
                </div>
            </div>
		`);
	}
}

function translation(lSrc, lDst, btn){
	function Init(){
		let query = $(lSrc).val();
		let reg = /\s+/g;
		// console.log(reg.test('absshhdn'));
		if( query=='' ){
			alert('不能输入为空');
			return;
		}else{

			$(lDst).append(`
				<div class="right clearfix">
	                <span class="right_icon"></span>
	                <div class="right_message">
	                    <div class="rArrow"></div>
	                    ${query}
	                </div>
	            </div>
			`);

			setTimeout(function(){
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
					beforeSend:function(){
						$(btn).attr("disabled","disabled");
					},
					success:function(data){
						console.log(data);
						let results=data.trans_result;
						let results_str = '';
						if(results){
							for(let i in results){
								let content = decodeURIComponent(results[i].dst) + '<br>';
								results_str += content;
							}
							$(lDst).append(`
								<div class="left clearfix">
					                <span class="left_icon"></span>
					                <div class="left_message">
					                    <div class="lArrow"></div>
					                    ${results_str}
					                </div>
					            </div>
							`);
							$(lSrc).val('');
							$(lDst).scrollTop( $(lDst)[0].scrollHeight )
						}else{
							alert("输入不能为空");
							clearMsg();
							return;
						}
						
					},
					complete: function(){
						$(btn).removeAttr("disabled");
					}
				});	
			},100);
		}
	}

	function clearMsg(){
		$('.message_pool').empty().append(`
			<div class="left clearfix">
                <span class="left_icon"></span>
                <div class="left_message">
                    <div class="lArrow"></div>
                    Hi, I am your translator(^_^). Please enter Chinese or English and I'll translate for you~~
                </div>
            </div>
		`);
	}

	$(btn).click(function(){
		Init();
	});
	$(lSrc).keyup(function(ev){
		if(ev.keyCode == 13){
			ev.preventDefault();
			Init();
		}
	}); 
}

