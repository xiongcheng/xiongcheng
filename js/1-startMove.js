/**
 * Created by xiongcheng on 2017/9/11.
 */
function startMove(obj,attr,target){ //当面临多个对象时，运动框架就需要多一个参数，需要指明是哪一个对象运动
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
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

        var speed=0;
        speed=(target-cur)/6;//确定速度值，缓冲运动中确定速度值的方法//目标值减去获取的样式值（宽、高、透明度）
        speed=speed>0?Math.ceil(speed):Math.floor(speed); //只要用到缓冲取值法，就必须要速度取整

        if(cur==target){
            clearInterval(obj.timer);
        }
        else{
            if(attr=='opacity'){
                obj.style.opacity=(cur+speed)/100;
                document.getElementById('txt1').value=obj.style.opacity;//这行代码是测试用的
            }
            else{
                obj.style[attr]=cur+speed+'px';
            }

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

