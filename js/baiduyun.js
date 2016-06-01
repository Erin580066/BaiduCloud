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
	

