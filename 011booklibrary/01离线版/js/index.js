window.onload = function () {
    var oName = document.getElementById('book_name');//书名
    var oNum = document.getElementById('book_num');//编号
    var oTab = document.getElementById('tab1');
    var btn1 = document.getElementById('tianjia');//添加
    var oBtn2 = oTab.tBodies[0].getElementsByTagName('button')[0];//删除
    var oBtn3 = document.getElementsByTagName('button');
    var oBtn4 = document.getElementById('btn');

    btn1.onclick = function () {           //添加功能
        var item = {name: oName.value, num: oNum.value};
        addItem(item);
    };

    // oBtn2.onclick = function () {   //删除功能
    //     oTab.tBodies[0].removeChild(this.parentNode.parentNode);
    // };


    var oSearch = document.getElementById('search');
    var oTxt = document.getElementById('txt');
    oSearch.onclick = function () {   //查询功能
        for (var i = 0; i < oTab.tBodies[0].rows.length; i++) {

            if (oTab.tBodies[0].rows[i].cells[1].innerHTML.search(oTxt.value) != -1) {
                oTab.tBodies[0].rows[i].style.background = 'yellow';
            }
            else {
                oTab.tBodies[0].rows[i].style.background = '';
            }
        }


    };

    //生成功能
    var oCreate = document.getElementById('shengcheng');
    // oCreate.onclick=function(){
    //     for(var i=0;i<oTab.tBodies[0].rows.length){
    //         oNum.value=oTab.tBodies[0].rows[i].cells[0].innerHTML ;
    //     }
    //
    //   alert(oNum.value);
    // };

    function fetchList() { //获取已存储的数据
        return JSON.parse(localStorage.getItem('data') || '[]'); //JSON.parse用于从一个字符串中解析出json对象
    }

    var dataList = fetchList();//读取已存储的数据

    function saveList() { //存储数据
        localStorage.setItem('data', JSON.stringify(dataList)); //JSON.stringify将数组转化为字符串
    }

    function renderList() {  //渲染表格数据

        oTab.tBodies[0].innerHTML = '';//清除之前的表格数据
        for (var i in dataList) { //
            var item = dataList[i];
            var oTr = document.createElement('tr');//创建一行tr
            var oTd = document.createElement('td');//创建一列td
            oTd.innerHTML = item.num;//
            oTr.appendChild(oTd);

            var oTd = document.createElement('td');
            oTd.innerHTML = item.name;
            oTr.appendChild(oTd);

            var oTd = document.createElement('td');
            oTd.innerHTML = '<button>删除</button>';
            oTr.appendChild(oTd);

            oTab.tBodies[0].appendChild(oTr);

            //       删除功能
            oTd.getElementsByTagName('button')[0].onclick = function () {
                oTab.tBodies[0].removeChild(this.parentNode.parentNode);

            };
        }

    }

    renderList();

    function addItem(item) {  //
        dataList.push(item);
        saveList();
        renderList();
    }

};











