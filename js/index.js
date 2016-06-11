 (function(){
	var datas = tools.store("miaov")
	if(datas&&!datas.files){
		datas = data;
		tools.store("miaov",datas);
	}
	
	var filesSet = tools.$('.filesSet')[0];
	var filebox = tools.$('.filebox')[0];
	var allLi = tools.$("li",filesSet);//filesSet下面的li
	var hiddenInput = tools.$(".hiddenInput")[0];//隐藏的input
	var files_nav = tools.$(".files_nav")[0];//导航菜单
	var info = tools.$('.otherinfo')[0];
	var selectNum = tools.$('.selectNum')[0];
	var span =tools.$('span',selectNum)[0];//统计选中的span
	var createFolder = tools.$('.createfile')[0];//创建文件夹按钮
	var names = null;
	getPidChild(0);
	function getPidChild(pid){
		for (var i = 0; i < datas.files.length; i++) {
			if(datas.files[i].pid == pid){
				var li = createLi({
					name:datas.files[i].name,
					id:datas.files[i].id
				})
				filesSet.appendChild(li);
				handleLi(li);
			}
		}
	}
	function getIdItem(id){
		for( var i = 0; i < datas.files.length; i++ ){
			if( datas.files[i].id == id ){
				return datas.files[i];
			}
		}
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
		names.select();//正在创建的状态
		this.isCreateStatus = true;
		handleLi(newLi);
		tools.each(allLi,function(item){//取消掉所有li中的样式
			cancelStyle(item);
		})
		
	})
	var navArr = [{filename:'返回上一级'},{filename:'全部文件',currentId:0}];
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
			if(rename.isRename){
				var currentItem = getIdItem(li.id);
				currentItem.name = names.value;
				rename.isRename = false;
			}else{
				datas.files.push({
					id:li.id,
					pid:hiddenInput.value,
					name:strong.innerHTML
				})
				tools.store("miaov",datas);
			}
			ev.stopPropagation();
		});
		// X键的绑定事件
		tools.addEvent(cancel,"click",function (ev){
			if(!rename.isRename){
				filesSet.removeChild(li);
				createFolder.isCreateStatus = false;
			}else{
				strong.style.display = "block";
				edtor.style.display = "none";
				rename.isRename = false;
			}
			ev.stopPropagation();
		});
		// 鼠标移进去的绑定事件
		tools.addEvent(li,"mouseenter",function (){
			if( !createFolder.isCreateStatus && !rename.isRename ){
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
		tools.addEvent(li,'click',function(){
			filesSet.innerHTML = "";
			getPidChild(this.id);
			hiddenInput.value = this.id;
			navArr.push({
				filename:strong.innerHTML,
				currentId:this.id
			});
			renderNav(navArr);
		});
		tools.addEvent(names,"click",function (ev){
			ev.stopPropagation();	
		})
	}
	///导航的处理事件
	tools.addEvent(files_nav,"click",function (ev){
		var target = ev.target;
		if(target.nodeName === 'A'){
			var currentId = target.getAttribute("currentId");
			filesSet.innerHTML = "";
			getPidChild(currentId);
			tools.each(navArr,function (item,index){
				if( item.currentId == currentId ){
					navArr.length = index+1;
				}
			});
			//如果点击的是 全部文件 那么从第二个开始渲染
			var startIndex = 0;
			if( currentId == 0 ){
				startIndex = 1;
			}
			renderNav(navArr,startIndex);
		}
	})
	//渲染导航
	function renderNav(navArr,startIndex){
		var str = "",startIndex = startIndex || 0;
		for( var i = startIndex; i < navArr.length-1; i++ ){
			if( i === 0 ){
				str += '<a href="javascript:;" index='+i+' currentId='+navArr[navArr.length-2].currentId+' class="nav_level">'+navArr[i].filename+'</a>|'
			}else{
				str += '<a href="javascript:;" index='+i+' currentId='+navArr[i].currentId+' class="nav_level">'+navArr[i].filename+'</a>>>>'
			}
		}
		str += '<span>'+navArr[navArr.length-1].filename+'</span>'
		files_nav.innerHTML = str;
	}
	function cancelStyle(li){
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		icon.style.borderColor = "#fff";	
		checkInput.style.display = "none";
		checkInput.checked = false;
	};
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
	///全选按钮
	var allSelected = tools.$(".allSelected")[0];///全选按钮 
	var icon = tools.$(".icon",filesSet);//filesSet下面的icon
	var checkInput = tools.$(".checkInput",filesSet);
	var seletedNum = 0;  //统计多少条被选中了

	tools.addEvent(allSelected,"click",function (){
		var _this = this;
		tools.each(icon,function (item,i){
			icon[i].style.borderColor = _this.checked ? "#2e80dc" : "#fff";
			checkInput[i].style.display = _this.checked ? "block" : "none";
			checkInput[i].checked = _this.checked;	
		});
		seletedNum = this.checked ? checkInput.length : 0;
		if( this.checked ){
			info.style.display = "block";
			seletedNum = icon.length;
			span.innerHTML = seletedNum;
		}else{
			info.style.display = "none";
			seletedNum = 0;
			span.innerHTML = seletedNum;
		}
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
			for (var i = 0; i < allLi.length; i++) {
				if(tools.collisionRect(oDiv,allLi[i])){
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
			if(seletedNum==allLi.length){
				allSelected.checked = true;
			}else{
				allSelected.checked = false;
			}
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
