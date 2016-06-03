/////搜索框的焦点事件
focusevent();
function focusevent(){
	var Btn = document.getElementById("btn");
	Btn.onfocus = function(){
		Btn.placeholder = ''
	}
}
var zIndex = 1;

window.onload = function() {
	var createfileright = document.getElementById("cont_right")
    createfileright.oncontextmenu = function(e) {
        showContextmenu(e, datas.contextmenu.common);
        return false;
    }
    document.onclick = hideContextmenu;
    refreshDirectory( getChildren(0) );
    window.onresize = refreshDirectoryPosition;


}
