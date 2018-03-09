/**variable haii ke this. darand ra mitavan az biroon seda kard , function haa ham 
hamin tor , amma dakhele function haii ke tarif mishan , nemishe fa this be function haye dakheli dastresi peyda kard ( be variable haa mishe haa ) va bayad mesle inja tava be i ke mikhaim be soorate ham khareji va ham dakheli sedashoon kard ta 2 
bar tarin kars ye bar ba this. ye bar bedoone this bayad sakhtes hye bar ba this - 

hatman this.func = func ra bayad bad az tarif shodane fun asli sakht ta undedined nashe*/
function myFader()
{

    fadeobj = [];
    fadetim = [];
    fadeopa = [];
    finOpa = [];
    fadeAfter = [];
    
    opaSpeed = 2 ;
    intervalTime = 30;
    
    fadeInterval = -1 ;
    
    /*opacity:0.5;
        filter: alpha(opacity=50);
        enter alpha between 0 and 100*/
    this.fade = function (targ,firstAlpha,destAlpha,after)
    {
        if(after==undefined)
        {
            after = new Function();
        }
        var index = -1 ;
        try{
            index = fadeobj.indexOf(targ);
        }catch(e){};
        if(index!=-1)
        {
            firstAlpha = fadeopa[index];
        }
        if(destAlpha == undefined)
        {
            destAlpha = 100 ;
        }
        if(firstAlpha == undefined || targ==undefined)
        {
            return ;
        }
        
        this.setOpacity(targ,firstAlpha);
        
        if(fadeInterval==-1)
        {
            fadeInterval = setInterval(checkAllImagesFade,intervalTime);
        }
        
        fadetim.push(intervalID);
        fadeobj.push(targ);
        fadeopa.push(firstAlpha);
        finOpa.push(destAlpha);
        fadeAfter.push(after);
    }
    
    checkAllImagesFade = function ()
    {
        if(fadeobj.length==0)
        {
            clearInterval(fadeInterval);
            fadeInterval = -1 ;
            return ;
        }
        
        for(var i=0 ; i<fadeobj.length ; i++)
        {
            if(finOpa[i]>fadeopa[i])
            {
                fadeopa[i] += Math.abs(opaSpeed) ;
                if(fadeopa[i]>finOpa[i])
                {
                    fadeopa[i] = finOpa[i];
                }
            }
            else
            {
                fadeopa[i] -= Math.abs(opaSpeed) ;
                if(fadeopa[i]<finOpa[i])
                {
                    fadeopa[i] = finOpa[i];
                }
            }
            setOpacity(fadeobj[i],fadeopa[i]);
            
            if(fadeopa[i] == finOpa[i])
            {
                fadeAfter[i]();
                fadetim.splice(i,1);
                fadeobj.splice(i,1);
                fadeopa.splice(i,1);
                finOpa.splice(i,1);
                fadeAfter.splice(i,1);
                i--;
            }
        }
    }
    
    
    /**set the object opacity - entered alpha is between 0 and 100*/
    this.setOpacity = function (target,alpha)
    {
        try{
            if(!newBrowser)
            {
                target.style.filter = "alpha(opacity="+Math.floor(alpha)+")";
            }
            
        }catch(e){};
        target.style.opacity = alpha/100;
        
        if(alpha==100)
        {
            try{
                target.style.filter = "none";
            }catch(e){};
        }
    }
    
    
    setOpacity = this.setOpacity ;
    fade = this.fade ;
}