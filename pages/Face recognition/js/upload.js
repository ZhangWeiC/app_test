
function handleFiles(files){
	if(window.File && window.FileReader && window.FileList && window.Blob){
		let file = files[0];  //获取图片资源

		if(!file.type.match('image.*')){
			return false;
		}

		let reader = new FileReader();
		reader.readAsDataURL(file);

		//渲染文件
		reader.onload = function(arg){
			let img = '<img class="preview" src="'+arg.target.result+'" alt="preview" />';
			$('.img-preview').empty().append(img);
		}
	}	
}


