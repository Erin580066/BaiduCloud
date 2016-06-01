///////创建显示右键菜单
var list = document.getElementById("R_cont");
function showcontextmenu(e,data){
	var contextmenuElement = document.getElementById("contextmenu");
	contextmenuElement.style.display = 'block';
	contextmenuElement.style.left = e.clientX + 'px';
	contextmenuElement.style.top = e.clientY + 'px';
	contextmenuElement.innerHTML = '';
	////创建菜单数据
	data.forEach(function(v,k){
		var aLi = document.createElement('li');
		aLi.innerHTML =  v.name;
		aLi.onclick = v.exe;
		contextmenuElement.appendChild(aLi);
	})
}
///////隐藏右键菜单
function hidecontextmenu(){
	var contextmenuElement = document.getElementById("contextmenu");
	contextmenuElement.style.display = 'none';
}
//////根据数据创建文件夹
function createFolder(data){
	var box = document.getElementById("box");
	var fileBox =document.createElement("div");
	fileBox.className = 'fileBox';
	var checkbox =document.createElement("div");
	checkbox.className = 'checkbox';
	var fileImage =document.createElement("div");
	fileImage.className = 'fileImage';
	var fileName =document.createElement("div");
	fileName.className = 'fileName';
	fileName.innerHTML = data.name;
	fileBox.appendChild(checkbox);
	fileBox.appendChild(fileImage);
	fileBox.appendChild(fileName);
	box.appendChild(fileBox);
}
//////刷新当前目录
function refreshdirectory(data){
	var box = document.getElementById("box");
	box.innerHTML = '';
	for (var i = 0; i < data.length; i++) {
		createFolder(data[i]);
	}
}