var MouseX = -100 ,
    MouseY = -100 ;



function addMouseEvent(target,mouseDown,mouseOver,mouseOut)
{
   if(typeof addEventListener != "undefined")
    {
        target.addEventListener('touchstart',mouseDown);
        target.addEventListener('mousedown',mouseDown);
        
        target.addEventListener('touchstart',mouseOver);
        target.addEventListener('mouseover',mouseOver);
        
        target.addEventListener('touchend',mouseOut);
        target.addEventListener('mouseout',mouseOut);
    }
    else// if(typeof attachEvent != "undefined")
    {
        target.onmousedown = mouseDown ;
        target.onmouseover = mouseOver ;
        target.onmouseout = mouseOut ;
    } 
}

if(typeof addEventListener != "undefined")
{
    document.addEventListener('touchstart',mouseIsDown);
    document.addEventListener('mousedown',mouseIsDown);
    
    document.addEventListener('touchmove',mouseIsMoves);
    document.addEventListener('mousemove',mouseIsMoves);
    
    document.addEventListener('touchend',mouseIsEnd);
    document.addEventListener('mouseup',mouseIsEnd);
}
else// if(typeof attachEvent != "undefined")
{
    window.document.onmousedown = mouseIsDown ;
    window.document.onmousemove = mouseIsMoves ;
    window.document.onmouseup = mouseIsEnd ;
}



var isTouchDefined = -1;






function mouseIsDown(e)
{
    e.preventDefault();
    
    if(isTouchDefined==-1)
    {
        try
        {
            if(e.changedTouches != undefined)
            {
                isTouchDefined = 0 ;
            }
        }catch(e){}
    }
    
    switch(isTouchDefined)
    {
        case(0):
        {
            MouseX = e.changedTouches[0].clientX;
            MouseY = e.changedTouches[0].clientY;
            break ;
        }
        case(1):
        {
            if(window.event != undefined)
            {
                MouseX = window.event.clientX;
                MouseY = window.event.clientY;
            }
            else
            {
                MouseX = e.clientX;
                MouseY = e.clientY;
            }
            break;
        }
    }
    MouseX += window.scrollX ;
    MouseY += window.scrollY ;
    
    //debug lines ↓
    /*console.log('moz:'+MouseX+','+MouseY);
    myMainMenusBack[0].style.backgroundColor = 'red';
    var pos = returnGlobalYX(myMainMenusBack[0]);
    console.log('salam : '+pos[0]+','+pos[1]);*/
    //debug lineed↑
}


function mouseIsMoves(e)
{
    switch(isTouchDefined)
    {
        case(0):
        {
            console.log('?');
            MouseX = e.changedTouches[0].clientX;
            MouseY = e.changedTouches[0].clientY;
            break ;
        }
        case(1):
        {
            console.log('>');
            if(window.event != undefined)
            {
                MouseX = window.event.clientX;
                MouseY = window.event.clientY;
            }
            else
            {
                MouseX = e.clientX;
                MouseY = e.clientY;
            }
            break;
        }
    }
    
    if(window.scrollX!=undefined)
    {
        MouseX += window.scrollX ;
        MouseY += window.scrollY ;
    }
    else
    {
        //?
    }
}

function mouseIsEnd(e)
{
    MouseX = -100 ;
    MouseY = -100 ;
}

function mouseHitted(targ)
{
    var x0=Infinity,xm=-Infinity,y0=Infinity,ym=-Infinity;
    if(targ.length == undefined )
    {
        targ = [targ] ;
    }
    for(var i = 0 ; i<targ.length ; i++)
    {
        //console.log(targ[i].parentElement.parentElement);
        var pos = returnGlobalYX(targ[i]) ;
        //console.log(pos[0]+' , '+pos[1]+'  vs  '+MouseX+' >> '+targ[i].offsetLeft);
        x0 = Math.min(targ[i].parentNode.parentNode.offsetLeft+
                      targ[i].offsetLeft,x0);//targ[i].offsetLeft
        var cash = targ[i].style.width;
        cash = String(cash).substring(0,cash.length-2);
        cash = Math.floor(cash);
        xm = Math.max(xm,x0+cash) ;
        y0 = Math.min(y0,pos[1]) ;//targ[i].offsetTop
        var cash = targ[i].style.height;
        cash = String(cash).substring(0,cash.length-2);
        cash = Math.floor(cash);
        ym = Math.max(ym,y0+cash);
    }
    
    //console.log(x0+','+y0+' - '+MouseX+','+MouseY);
    if(MouseX>x0 && MouseX<xm && MouseY>y0 && MouseY<ym)
    {
        return true ;
    }
    else
    {
        return false ;
    }
}

function returnGlobalYX(targ)//:Array
{
    //console.log(targ.style.position);//;+' : '+getCurrentStyle(targ,'position'));
    //return;
    var x = targ.offsetLeft ;
    var y = targ.offsetTop ;
    
    //console.log(targ+'x : '+x+' vs '+MouseY);
    
    
    //console.log('y is '+y);
    //console.log(targ.parentElement+' : '+y+'  -  '+targ.style.position+' vs '+document.body);
    if(targ.parentElement!=null && targ.style.position!='absolute')
    {
        //console.log('manage me ');
        var cash = returnGlobalYX(targ.parentElement);
        x += cash[0];
        y += cash[1];
    }
    return [x,y];
}