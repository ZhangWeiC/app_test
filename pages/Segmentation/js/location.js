$(function(){

	$('.main-btn').click(function(){
		$('.main-btn').fadeOut(200);
		$('.main-intro').fadeOut(200);
		$('.main-upload').fadeIn(300);
		$('.img-preview').empty().hide();
		$('#img-file-input').val('');
	});
		
	$('.up-close').on('click',function(){
		$('.main-upload').fadeOut(200);
		$('.main-intro').fadeIn(300);
		$('.main-btn').fadeIn(300);
		$('.up-explain').show();
		$('.img-up-add').show();
		$('.up-btn').hide();
	});

	var file_data = '';
	var fd = null;

	$('#img-file-input').change(function(e){
		let that = this;
		if(window.File && window.FileReader && window.FileList && window.Blob){
			let file = e.target.files[0];  //获取图片资源
			console.log(file);

			if(!file.type.match('image.*')){
				return false;
			}

			let reader = new FileReader();
			reader.readAsDataURL(file);

			//渲染文件
			reader.onload = function(arg){
				$('.img-up-add').hide();
				$('.up-explain').hide();
				$('.img-preview').show();
				$('.up-btn').show();
				let img = '<img class="preview" src="'+arg.target.result+'" alt="preview" />';
				file_data = arg.target.result;
				fd = convert(arg.target.result);
				console.log(fd);
				$('.img-preview').empty().append(img);
			}
		}	
	});

	$('.img-up-add').on('click',function(e){
		$('#img-file-input').trigger('click');
		e.preventDefault();
	});

	$('.up-refresh').on('click',function(){
		// console.log(1);
		$('#img-file-input').val('');
		$('.img-preview').empty().hide();
		$('.up-btn').hide();
		$('.up-explain').show();
		$('.img-up-add').show();
	})

	//上传服务器
	$('.up-btn').on('click',function(){
		if(!fd){
			alert('上传内容不正确');
			return false;
		}else{
			$.ajax({
				async: false,
				type: 'POST',
				url: 'http://47.92.96.143/api/resize',
				dataType: 'json',
				crossDomain: true,
				processData: false,
				contentType: false,
				data: fd,
				cache: false,
				success: function(msg){
					console.log(msg);
					var timer = setInterval(function(){
						$.ajax({
							async: false,
							type: 'GET',
							url: 'http://47.92.96.143/api/resize/'+msg,
							// dataType: 'blob',
							// data: {'session_id': msg},
							success: function(data){
								// console.log(data);
								if(data == "Session "+msg+" still processing"){
									console.log(data);
								}else{
									// $('.result').fadeIn(300);
									clearInterval(timer);

									console.log(data);
									// $('body').append('<img src=http://47.92.96.143/api/resize/'+msg+' alt="" />');
									$('body').append('<img src='+data+' alt="" />');
									// var sImg='<img class="sourceImg" src='+ file_data +' alt="sourceImg">';
									// var rImg='<img class="sourceImg" src='+ data +' alt="sourceImg">';
								}
							},
							// complete: function(){}
							error: function(XMLHttpRequest,textStatus,errorThrown){
								clearInterval(timer);
								if(XMLHttpRequest.status=='409'){
									alert('有冲突');
								}else if(XMLHttpRequest.status=='404'){
									alert('不存在');
								}
								console.log(XMLHttpRequest.status);
								console.log(XMLHttpRequest.readyState);
								console.log(textStatus);
							}
						});	
					},3000);
				},
				error: function(XMLHttpRequest,textStatus,errorThrown){

					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				}
			});
		}
	});

	//关闭结果层
	$('.r_close').on('click',function(e){
		e.preventDefault();
		$('.result').fadeOut(400);
	});

});