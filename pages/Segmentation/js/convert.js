function convert(file_data){
	let bArr = file_data.split(','), mime=bArr[0].match(/:(.*?);/)[1];
	let bstr = window.atob(bArr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	console.log(bstr);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	let obj = new Blob([u8arr],{type:mime});
	let fd = new FormData();
	fd.append("image", obj, 'image.jpg');
	fd.append("width", 100);
	fd.append('height', 60);
	return fd;
}