/**
 * Created by xiongcheng on 2017/9/8.
 */
//物体运动的框架
//物体运动肯定要用到定时器setInterval 运动的速度speed
    //记住还要考虑透明度的情况 opacity:0.6;与width:100px;的区别

//attr 属性值 target 目标值  现在用json来代替这两个值，target的值就是用json[attr]来代表
function startMove(obj,json,fnEnd){ //当面临多个对象时，运动框架就需要多一个参数，需要指明是哪一个对象运动
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true; //假设：所有的值都已经到了
        for(var attr in json){//将整个内容全部放在json循环里面
            var cur=0;
            if(attr=='opacity'){
//                    重点如下
                cur=Math.round(parseFloat(getStyle(obj,attr))*100); //如果设置的是物体的透明度，就执行这行代码
//                    parseFloat()可取小数，Math.round是四舍五入
            }
            else{
                cur=parseInt(getStyle(obj,attr));//用一个变量将取非行间样式的函数存起来，方便使用
//                    parseInt()是取整
            }

            var speed=(json[attr]-cur)/6;//确定速度值，缓冲运动中确定速度值的方法//目标值减去获取的样式值（宽、高、透明度）
            speed=speed>0?Math.ceil(speed):Math.floor(speed); //只要用到缓冲取值法，就必须要速度取整

            if(cur!=json[attr])//当有一个值不等于目标点时
                bStop=false;//假设不成立

            //判断是透明度，执行的代码
            if(attr=='opacity'){
                obj.style.opacity=(cur+speed)/100;
                //document.getElementById('txt1').value=obj.style.opacity;//这行代码是测试用的
            }
            else{
                obj.style[attr]=cur+speed+'px';
            }

            // if(cur==json[attr]){
            //     clearInterval(obj.timer);//只要达到目标值就关闭定时器，不符合多个属性值变化
            //     //检测一下函数参数是否传进来没
            //     if(fnEnd) fnEnd();
            // }
            // else{
            // }

        }

        //这行最后判断的代码必须放在json循环后面
        if(bStop){//最后检测，所有值是否已经达到，当为true时，就关闭定时器
            clearInterval(obj.timer);
            //     //检测一下函数参数是否传进来没
            if(fnEnd) fnEnd();
        }
    },30);
}

function getStyle(obj,name){//构造一个函数，取非行间样式,也能取透明度样式
    if(obj.currentStyle){
        return (obj.currentStyle[name]);
    }
    else{
        return (getComputedStyle(obj,false)[name])
    }
}
//这种方式获取的非行间样式，就是物体的宽高，不用考虑border，padding等


