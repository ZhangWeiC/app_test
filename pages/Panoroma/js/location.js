$(function(){

	$('.main-btn').click(function(){
		$('.main-btn').fadeOut(200);
		$('.main-intro').fadeOut(200);
		$('.main-upload').fadeIn(300);
		$('.vid-preview').empty().hide();
		$('#vid-file-input').val('');
	});
		
	$('.up-close').on('click',function(){
		$('.main-upload').fadeOut(200);
		$('.main-intro').fadeIn(300);
		$('.main-btn').fadeIn(300);
		$('.up-explain').show();
		$('.vid-up-add').show();
		$('.up-btn').hide();
	});

	var file_data = '';
	var fd = null;

	$('#vid-file-input').change(function(e){
		let that = this;
		if(window.File && window.FileReader && window.FileList && window.Blob){
			let file = e.target.files[0];  //获取图片资源
			console.log(file);

			let reader = new FileReader();
			reader.readAsDataURL(file);

			//渲染文件
			reader.onload = function(arg){
				$('.vid-up-add').hide();
				$('.up-explain').hide();
				$('.vid-preview').show();
				$('.up-btn').show();
				let video =  '<video controls class="video" src='+ arg.target.result +'></video>';
				file_data = arg.target.result;
				fd = convert(arg.target.result);
				$('.vid-preview').empty().append(video);
			}
		}	
	});

	$('.vid-up-add').on('click',function(e){
		$('#vid-file-input').trigger('click');
		e.preventDefault();
	});

	$('.up-refresh').on('click',function(){
		// console.log(1);
		$('#vid-file-input').val('');
		$('.vid-preview').empty().hide();
		$('.up-btn').hide();
		$('.up-explain').show();
		$('.vid-up-add').show();
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
				url: 'http://47.92.96.143/api/pano',
				dataType: 'json',
				crossDomain: true,
				processData: false,
				contentType: false,
				data: fd,
				cache: false,
				beforeSend: function(){
					$('.up-btn').attr({disabled: 'disabled'});
					$('.spinner').show();
				},
				success: function(msg){
					// console.log(msg);
					var timer = setInterval(function(){
						$.ajax({
							async: false,
							type: 'GET',
							url: 'http://47.92.96.143/api/pano/'+msg,
							dataType: 'json',
							success: function(data){
								console.log(data);
								if(data == "Session "+msg+" still processing"){
									console.log(data);
								}else{
									clearInterval(timer);
									console.log(data);
								}
							},
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
				complete: function(){
					$('.spinner').hide();
					$('.up-btn').removeAttr('disabled');
					
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
		$('.sImg').html('');
		$('.rDes_list').html('');
	});

});