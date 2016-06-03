/////右键菜单数据
var datas = {
    //右键菜单数据
    contextmenu: {
        //common菜单组
        common: [
            {
                name: "创建",
                exe: function() {
                    var name = prompt('请输入文件夹名称：')||'新建文件夹';
                    if (name) {

                        for ( var i=0; i<datas.files.length; i++ ) {
                            if (datas.files[i].name == name) {
                                alert('已经存在该名称文件夹了');
                                return;
                            }
                        }

                        datas.files.push({
                            id: getMaxId() + 1,
                            pid: 0,
                            name: name
                        });
                        refreshDirectory(getChildren(0));

                    }
                }
            },
            {
                name: "刷新",
                exe: function() {
                    refreshDirectory( getChildren(0) );
                }
            },
            {
                name: "粘贴",
                exe: function() {
                    alert('粘贴')
                }
            }
        ],
        //文件夹
        folder: [
            {
                name: "打开"
            },
            {
                name: "复制"
            },
            {
                name: "剪切"
            }
        ]
    },
    //文件数据
    files: [
        {
            id: 1,
            pid: 0,
            name: "技术"
        },
        {
            id: 2,
            pid: 0,
            name: "游戏"
        },
        {
            id: 3,
            pid: 0,
            name: "城市"
        },
        {
            id: 4,
            pid: 2,
            name: "前端"
        },
        {
            id: 5,
            pid: 1,
            name: "后端"
        }
    ]

};