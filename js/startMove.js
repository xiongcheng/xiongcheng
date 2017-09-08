/**
 * Created by xiongcheng on 2017/9/8.
 */
//物体运动的框架
//物体运动肯定要用到定时器setInterval 运动的速度speed
    //记住还要考虑透明度的情况 opacity:0.6;与width:100px;的区别


function starMove(obj,attr,target){
   clearInterval(obj.timer)//必须先关闭一个定时器 obj.timer指明是哪个物体的定时器
    obj.timer=setInterval(function(){//再开一个定时器
        var speed=0;
        if(attr==opacity){
           var arr=Math.round(parseFloat(getStyle(obj,attr)))
        }
        else{
            var arr=parseInt(getStyle(obj,attr))//获取想要让其变化的样式值，为了写起来方便，用一个变量将其存储起来
            //获取的物体的样式值要取整
        }

        speed=(target-speed)/6;//缓冲运动的speed的取值方法 目标值跟速度成正比，越靠近目标值，速度越慢
        speed=speed>0?(Math.ceil(speed)):(Math.floor(speed));//缓冲运动的速度值，一定要做向上向下取整处理，不然速度值是小数的时候，会自动舍弃，取值不完整

        if(arr==target){
           clearInterval(obj.timer)
        }
        else{
            if(attr==opacity){
                obj.style.opacity=(arr+speed)/100;

            }
            else{
                obj.style.attr=arr+speed+'px'
            }
        }

    },30)
}




//获取非行间样式框架，因为offset（width，height，opacity）有弊端，所以用另一种方式获取元素宽高样式属性
//一定要记得currentStyle //IE   getComputedStyle((obj,false)[name])  //FF Chrome

function getStyle(obj,name){
    if(obj.currentStyle){
        return (obj.currentStyle[name]);//name作为参数，这个时候.name就应该写成[name]  切记
    }
    else{
        return(getComputedStyle((obj,false)[name]));
    }
}
//这种方式获取的非行间样式，就是物体的宽高，不用考虑border，padding等