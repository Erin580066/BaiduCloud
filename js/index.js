 (function(){
	var datas = tools.store("miaov")
	if(datas&&!datas.files){
		datas = data;
		tools.store("miaov",datas);
	}
	function createLi(options){
		options = options || {};
		//传进来的对象，某些调用函数的时候，可能只不会传入很多值，只会传入需要的值
		var defaults = {
			name:options.name || "新建文件夹",
			id:options.id || 0
		};
		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong>'+defaults.name+'</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="'+defaults.name+'" class="names"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';
				;
		li.innerHTML = str;
		li.id = defaults.id;
		return li;
	}
	var allSelected = tools.$(".allSelected")[0];///全选按钮 
	var filesSet = tools.$('.filesSet')[0];
	var filebox = tools.$('.filebox')[0];
	var lis = tools.$('li',filesSet);//filesSet下面的li
	var icon = tools.$(".icon",filesSet);//filesSet下面的icon
	var info = tools.$('.otherinfo')[0];
	var selectNum = tools.$('.selectNum')[0];
	var span =tools.$('span',selectNum)[0];
	var createFolder = tools.$('.createfile')[0];//创建文件夹按钮
	var seletedNum = 0;
	var allLi = tools.$("li",filesSet);//获取到所有的li
	var hiddenInput = tools.$(".hiddenInput")[0];//隐藏的input
	var names = null;
	getPidChild(0);
	function getPidChild(id){
//		如果files中没有数据，那么就不再生成li
		if(!data.files){
			return;
		}
		tools.each(data.files,function (item){
			if( item.pid == id ){
				var newLi = createLi({
					name:item.name,
					id:item.id   //传入id，挂载在生成的li上
				});
				filesSet.appendChild(newLi);
			}
		});
	}
	////生成动态文件夹
	filesSet.innerHTML = '';
	for(var i=0;i<data.files.length;i++){
		var newLi = createLi(data.files[i],true);
		filesSet.appendChild(newLi);
	}
	var checkInput = tools.$(".checkInput",filesSet);//每一个按钮
	var random = new Date().getTime();//创建文件夹的时候随机
	names = tools.$(".names",newLi)[0];
	tools.each(allLi,function (itemLi){
		handleLi(itemLi)
	});
	function handleLi(li){
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var ok = tools.$(".ok",li)[0];
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var names = tools.$(".names",li)[0];
		// √键的绑定事件
		tools.addEvent(ok,"click",function(ev){
			strong.style.display = "block";
			edtor.style.display = "none";
			strong.innerHTML = names.value;
			createFolder.isCreateStatus = false;
			
			ev.stopPropagation();
		});
		// X键的绑定事件
		tools.addEvent(cancel,"click",function (ev){
			filesSet.removeChild(li);
			createFolder.isCreateStatus = false;
			ev.stopPropagation();
		});
		// 鼠标移进去的绑定事件
		tools.addEvent(li,"mouseenter",function (){
			if( !createFolder.isCreateStatus ){
				icon.style.borderColor = "#2e80dc";	
				checkInput.style.display = "block";	
			}
		})
		// 鼠标离开的绑定事件
		tools.addEvent(li,"mouseleave",function (){
			if( !checkInput.checked ){
				icon.style.borderColor = "#fff";	
				checkInput.style.display = "none";	
			}
		});
	}
	//新建文件夹
	tools.addEvent(createFolder,'click',function(){
		if( this.isCreateStatus ){
			names.select();
			return;
		};
		var random = new Date().getTime();//根据时间戳来创建文件夹
		var newLi = createLi(
			{
				id:random
			}
		);
		filesSet.appendChild(newLi);
		names = tools.$(".names",newLi)[0];//修改名字的输入框
		var strong = tools.$("strong",newLi)[0];
		var edtor = tools.$(".edtor",newLi)[0];
		strong.style.display = "none";
		edtor.style.display = "block";//新建的时候让输入框显示
		names.select();
		this.isCreateStatus = true;
		handleLi(newLi);
		
	})
	
	///全选按钮
	tools.addEvent(allSelected,"click",function (){
		for (var i = 0; i < icon.length; i++) {
			if(this.checked){
				icon[i].style.borderColor = '#2e80dc';
				checkInput[i].style.display = 'block';
				info.style.display = 'block';
				span.innerHTML = icon.length;
			}else{
				icon[i].style.borderColor = '#fff';
				checkInput[i].style.display = 'none';
				info.style.display = 'none';
			}
			checkInput[i].checked = this.checked;
		}
		seletedNum = this.checked ? checkInput.length : 0;
	});
	//每个文件夹上的按钮
	tools.each(checkInput,function(item,index){
		tools.addEvent(item,'click',function(ev){
			if( this.checked ){
				//选中的状态
				allSelected.checked = true;
				//只要有一个没选中，就不选中
				tools.each(checkInput,function (input){
					if( !input.checked ){
						allSelected.checked = false;
					}	
				});
				seletedNum++;
				info.style.display = "block";

			}else{
				allSelected.checked = false;
				seletedNum--;
				if(seletedNum == 0){
					info.style.display = "none";
				}
			};
			span.innerHTML = seletedNum;
			ev.stopPropagation();
		})
	});
	//碰撞框选
	tools.addEvent(filebox,'mousedown',function(ev){
		var e = ev || event;
		var disX = e.clientX;
		var disY = e.clientY;
		var oDiv = document.createElement('div');
		oDiv.className = 'collision';
		document.body.appendChild(oDiv);
		tools.addEvent(document,'mousemove',handleMove);
		tools.addEvent(document,'mouseup',up);
		function handleMove(ev){
			var e = ev || event;
			if(e.clientX>disX){
				oDiv.style.left = disX + 'px';
			}else{
				oDiv.style.left = e.clientX + 'px';
			}
			if(e.clientY>disY){
				oDiv.style.top = disY + 'px';
			}else{
				oDiv.style.top = e.clientY + 'px';
			}
			oDiv.style.width = Math.abs(e.clientX -disX) + 'px';
			oDiv.style.height = Math.abs(e.clientY -disY) + 'px';
			seletedNum=0;
			for (var i = 0; i < lis.length; i++) {
				if(tools.collisionRect(oDiv,lis[i])){
					icon[i].style.borderColor = '#2e80dc';
					checkInput[i].style.display = 'block';
					checkInput[i].checked = true;
					seletedNum++;
				}else{
					icon[i].style.borderColor = '#fff';
					checkInput[i].style.display = 'none';
					checkInput[i].checked = false;
				}
				info.style.display = 'block';
			}
			if(seletedNum == 0){//鼠标按下没碰上的时候info不显示
				info.style.display = 'none';
			}
			if(seletedNum==lis.length){
				allSelected.checked = true;
			}else{
				allSelected.checked = false;
			}
			console.log(span)
			span.innerHTML = seletedNum;
		}
		function up(){
			tools.removeEvent(document,'mousemove',handleMove );
			tools.removeEvent(document,'mouseup',up );
			if(oDiv){
				document.body.removeChild(oDiv);
			}
			if(seletedNum == 0){
				info.style.display = 'none';
			}
		}
		ev.preventDefault();
	});	
	
})()