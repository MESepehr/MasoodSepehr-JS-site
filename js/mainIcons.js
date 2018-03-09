
function MainIconMenu(backImage,topImage,heigth0,maxHeigth,Y0,getID)
{
    var Fs = 12;
    var Fs2 = 2;
    var Fr = 0.8;
    
    var myID = getID ;
    
    var onClicked = function()
    {
        //window.CurrentPage = myID ;
    }
    
    var back = backImage ;
    var top = topImage ;
    var H = heigth0 ;
    var Hmax = maxHeigth ;
    var Ymin = Y0 ;
    
    var currentH = H ;
    
    var intervalID = -1 ;
    
    var Vy = 0 ;
    
    back.style.position = "relative";
    top.style.position = "relative";
    top.style.top = Ymin+'px';
    back.style.height = H+'px';
    
    backImage.onmouseup = onClicked;
    topImage.onmouseup = onClicked;
    backImage.onclick = onClicked;
    topImage.onclick = onClicked;
    
    var myH = H ;
    
    /*mouse = function()
    {
        myH = Hmax ;
    }*/
    
    function over ()
    {
        myH = Hmax-Ymin ;
    }
    
    function end ()
    {
        myH = H ;
    }
    
    
    addMouseEvent(back,onClicked,over,end);
    addMouseEvent(top,onClicked,over,end);
    
    
    var anim = function()
    {
        /*if(mouseHitted([back,top]))
        {
            over();
        }
        else{
            end();
        }*/
        
        Vy+=(myH-currentH)/Fs;
        Vy*=Fr;
        currentH += Vy/Fs2 ;
        if(currentH<0)
        {
            Vy = 0 ;
            currentH = 0 ;
        }
        back.style.height = Math.floor(currentH)+'px';
    }
    
    if(intervalID==-1)
    {
        intervalID = setInterval(anim,40);
    }
}