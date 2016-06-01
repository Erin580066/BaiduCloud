/////搜索框的焦点事件
focusevent();
function focusevent(){
	var Btn = document.getElementById("btn");
	Btn.onfocus = function(){
		Btn.placeholder = ''
	}
}
/////全局右键菜单
document.oncontextmenu = function(e){
	showcontextmenu(e,datas.contextmenu.commen);
	return false;/////阻止默认事件
};
document.onclick = hidecontextmenu;
//////根据已有文件数据 datas.files来初始化创建文件夹/文件
refreshdirectory(getChildren(0));
//console.dir(getChildren(1))

