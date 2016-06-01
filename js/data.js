/////右键菜单数据
var datas = {
	contextmenu:{
		/////菜单数据
		commen:[
			{
				name:'创建',
				exe:function(){
					var name = prompt('请输入文件夹名称:')||'新建文件夹';
					if(name){
						for (var i = 0; i < datas.files.length; i++) {
							if(datas.files[i].name == name){
								alert('该文件夹已经存在了');
								return;
							}
						}
						datas.files.push({
							name:name
						});
						refreshdirectory(datas.files);
					}
				}
			},
			{
				name:'刷新',
				exe:function(){
					refreshdirectory(datas.files);
				}
			},
			{
				name:'粘贴',
				exe:function(){
					alert('粘贴')
				}
			},
			{
				name:'删除最后一个',
				exe:function(){
					datas.files.pop();
					refreshdirectory(datas.files)
				}
			}
//			,
//			{
//				name:'创建随机菜单',
//				exe:function(){
//					datas.contextmenu.commen.push({
//						name:Math.random(),
//						exe:function(){
//							alert(Math.random())
//						}
//					})
//				}
//			}
		],
		//文件夹菜单组
		folder:[
			{
				name:'打开'
			},
			{
				name:'复制'
			},
			{
				name:'剪切'
			}
		]
	},	
	/////文件数据
	files:[
		{
			id:1,
			pid:0,
			name:'技术'
			
		},
		{
			id:2,
			pid:0,
			name:'游戏'
		},
		{
			id:3,
			pid:0,
			name:'城市'
		},
		{
			id:4,
			pid:1,
			name:'前端'
		},
		{
			id:5,
			pid:1,
			name:'后端'
		}
	]
}