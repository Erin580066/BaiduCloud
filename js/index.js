 (function(){
	var datas = tools.store("miaov")
	if(datas&&!datas.files){
		
		datas = data;
		tools.store("miaov",datas);
	}
	function createNewFile(datas,onOff){
		var li = document.createElement('li')
		var str = '';
		str += '<div class="icon">'+
					'<input type="checkbox"  class="checkInput" />'+
					'</div>';
				if(onOff){
					str+='<strong style="display:block;">'+datas.name+'</strong>';
				}else{
					str+='<strong style="display:none;">'+datas.name+'</strong>';
				}
				if(onOff){
					str += '<div class="clearFix edtor"  style="display:none;">';
				}else{
					str += '<div class="clearFix edtor"  style="display:block;">';
				}		
				str+='<input type="text" value="'+datas.name+'" class="createInputBtn"  />'+
						'<input type="button" value="√" />'+
						'<input type="button" value="×" />'+
					'</div>';
		li.innerHTML = str
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
	var createFolder = tools.$('.createFile')[0];//创建文件夹按钮
	var seletedNum = 0;
	
	////生成动态文件夹
	filesSet.innerHTML = '';
	for(var i=0;i<data.files.length;i++){
		var newLi = createNewFile(data.files[i],true);
		filesSet.appendChild(newLi);
	}
	var checkInput = tools.$(".checkInput",filesSet);//每一个按钮
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
		tools.addEvent(item,'click',function(){
			if(this.checked){
				allSelected.checked = true;
				tools.each(checkInput,function(item1){
					if(!item1.checked){
						allSelected.checked = false;
					}
				});
				seletedNum++;
			}else{
				this.parentNode.style.borderColor = '#fff';
				this.style.display = 'none';
				allSelected.checked = false;
				seletedNum--;
				if(seletedNum==0){
					info.style.display = 'none';
				}
			}
			span.innerHTML = seletedNum;
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
