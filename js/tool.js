/**
 * Created by 毅 on 2016/5/20.
 */
/*
* 创建显示右键菜单
* */
function showContextmenu(e, data) {
    var contextmenuElement = document.getElementById('contextmenu');

    contextmenuElement.style.display = 'block';
    contextmenuElement.style.left = e.clientX + 'px';
    contextmenuElement.style.top = e.clientY + 'px';

    //创建菜单数据
    contextmenuElement.innerHTML = '';
    data.forEach(function(v, k) {
        var li = document.createElement('li');
        li.innerHTML = v.name;
        //给每一个菜单项，添加点击处理
        li.onclick = v.exe;
        contextmenuElement.appendChild(li);
    });
}
/*
* 隐藏右键菜单
* */
function hideContextmenu() {
    var contextmenuElement = document.getElementById('contextmenu');
    contextmenuElement.style.display = 'none';
}

/*
* 根据数据创建文件夹
* data => {
*   name : 文件夹名称
* }
* */
function createFolder(data) {
    var box = document.getElementById('box');

    var fileBox = document.createElement('div');
    fileBox.className = 'fileBox';
    fileBox.fileId = data.id;

    var checkbox = document.createElement('div');
    checkbox.className = 'checkbox';

    var fileImage = document.createElement('div');
    fileImage.className = 'fileImage';

    var fileName = document.createElement('div');
    fileName.className = 'fileName';
    fileName.innerHTML = data.name;

    fileBox.ondblclick = function() {
        refreshDirectory( getChildren(this.fileId) );
    }

    //绑定拖拽
    drag(fileBox);

    fileBox.appendChild(checkbox);
    fileBox.appendChild(fileImage);
    fileBox.appendChild(fileName);
    box.appendChild(fileBox);
}

/*
* 刷新当前目录
* */
function refreshDirectory(data) {
    var box = document.getElementById('box');
    box.innerHTML = '';
    for (var i=0; i<data.length; i++) {
        createFolder(data[i]);
    }
    refreshDirectoryPosition();
}

/*
* 刷新目录位置
* */
function refreshDirectoryPosition() {
    var folders = document.querySelectorAll('.fileBox');
    var width = 122;
    var height = 122;
    var cells = Math.floor(document.documentElement.clientWidth / width);

    for (var i=0; i<folders.length; i++) {
        folders[i].style.position = 'absolute';

        folders[i].style.left = i % cells * width + 'px';
        folders[i].style.top = Math.floor(i / cells) * height + 'px';
    }
}

/*
* 拖拽
* */
function drag(obj) {
    obj.onmousedown = function(e) {
        var folders = document.querySelectorAll('.fileBox');
        obj.style.zIndex = zIndex++;
        var disX = e.clientX - this.offsetLeft;
        var disY = e.clientY - this.offsetTop;

        document.onmousemove = function(e) {
            obj.style.left = e.clientX - disX + 'px';
            obj.style.top = e.clientY - disY + 'px';
        }

        document.onmouseup = function() {
            document.onmousemove = null;
            for ( var i=0; i<folders.length; i++ ) {
                if ( obj != folders[i] && crash(obj, folders[i]) ) {
                    //console.log(i)

                    //console.log(obj.fileId)

                    //console.log( getInfo(obj.fileId) );

                    var info1 = getInfo(obj.fileId);
                    var info2 = getInfo(folders[i].fileId);
                    info1.pid = info2.id;

                    refreshDirectory( getChildren(0) );

                    //console.log(datas.files)

                    //我这里偷懒，你应该去实现检测，如果碰上了多个，则需要检测最近的那个
                    return;
                }
            }
        }

        return false;
    }
}

/*
* 碰撞检测
* */
function crash(obj1, obj2) {
    var pos1 = obj1.getBoundingClientRect();
    var pos2 = obj2.getBoundingClientRect();

    return !(pos1.right < pos2.left || pos1.left > pos2.right || pos1.bottom < pos2.top || pos1.top > pos2.bottom);
}