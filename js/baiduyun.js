/////搜索框的焦点事件
focusevent();
function focusevent(){
	var Btn = document.getElementById("btn");
	Btn.onfocus = function(){
		Btn.placeholder = ''
	}
}
/////全局右键菜单