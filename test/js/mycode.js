
var newBrowser = false;
if (  document.addEventListener  ){
    //newBrowser = true;
    //Debug line ↑
}


var mainIconsID = [1,2,3,4,5,6,7,8,9,10];
var secondMenuVals = {
    folder:'img\\menus2\\',
    images:['01','02','03','04','05','06','07','08','09','10','11','12'],
    ids:[],
    fileType:'.png'
};

if(!newBrowser)
{
    //alert('this browser is not supported');
}


var backGround = document.getElementById('back');
backGround.style.backgroundColor="#FFFFFF";

var pixelss = document.getElementById('mypixels');

var ContentCadr = getElementsByClassName('content')[0];

//console.log('DONT FORGET THAT EXPLORER CAN NOT DETECT PAGE SCROLLSS FOR HITTESTS - solve it on mouse.js line 126');

//i prefered to take icons up with marginTop . and i set it manualy .

//dont forget you have to setUp a frame with static heigth and width to have 
//      all inside elemets ( lines , icons , gallery ) inside of it self and
//      set the overflow to hide for it.

/**gude*/
var CurrentPage = Number(String(window.location.hash).substring(1)) ;
var LastPage = -1 ;


creatingPixels();

function creatingPixels() 
{
    var myWith = 1024;
    var meyHeight = 700;
    var pixHeight = 14 ;
    var lineH = 1 ;
    var charts = document.getElementById('pix1');
    charts.style.listStyle = 'none';
    charts.style.padding = '0';
    for(var i = 0 ; i<meyHeight ; i+=pixHeight+lineH )
    {
        var lineli = document.createElement('li');
        //line.style.width = myWith+'px';
        lineli.style.width = '100%';
        lineli.style.height = pixHeight+'px';
        lineli.style.borderBottom = lineH+'px solid #666666';
        charts.appendChild(lineli);
    }
    
    charts = document.getElementById('pix2');
    charts.style.listStyle = 'none';
    charts.style.marginTop='-700px';
    charts.style.width = '1024px';
    charts.style.padding = '0';
    for(var i = 0 ; i<myWith ; i+=pixHeight+lineH )
    {
        var lineli = document.createElement('li');
        lineli.style.width = pixHeight+'px';
        lineli.style.height = '750px';
        lineli.style.borderRight = lineH+'px solid #666666';
        charts.appendChild(lineli);
    }
    //backGround.appendChild(charts);
    //charts.style.left = '0px';
    //charts.style.top = backGround.offsetTop+'px';
}


var myMainMenusBack = getElementsByClassName("icons_back");
var myMainMenusTop = getElementsByClassName("icons_top");

var debugerrX = document.getElementById("debugerX");
var debugerrY = document.getElementById("debugerY");




var iconMenu = getElementsByClassName("icons_menu");

var fadeControll = new myFader();

var mainIcon = [];



//var bigMenu = document.getElementById(secondmenu);
//alert(bigMenu.get);

//start to load menu pictures
makeMenu();

fadeControll.setOpacity(getElementsByClassName('mainlogo2')[0],0);


function completeNum(num)
{
    num = String(num);
    while(num.length<2)
    {
        num = '0'+num ;
    }
    return num ;
}

/**load the main menu icons*/
function makeMenu()
{
    var icon_folder = "img/menus/",
        iconsN = 10,
        icons_name = [],
        numb = '',
        fileType = '.png';
    
    for(var i=1;i<=iconsN;i++)
    {
        numb = completeNum(i)
        icons_name.push(icon_folder+numb+'-1'+fileType);
        icons_name.push(icon_folder+numb+'-2'+fileType);
    }
    
    //load icons images here↓s
    loadThese(icons_name,allIconLoaded);
}

/**load second menu images*/
function makeMenu2()
{
    var icon_folder = "img/menus2/",
        iconsN = 10,
        icons_name = [],
        numb = '',
        fileType = '.png';
    
    for(var i=1;i<=iconsN;i++)
    {
        numb = completeNum(i);
        icons_name.push(icon_folder+numb+fileType);
    }
    
    loadThese(icons_name,secondMenuLoaded);
}
function allIconLoaded()
{
    var HS = [17,10,20,13,10,10,10,50,80,80]
    for(var i=0;i<myMainMenusBack.length ; i++)
    {
        myMainMenusBack[i].style.margin = 0 ;
        myMainMenusBack[i].style.backgroundImage = "url("+loadedImages[i*2+1].src+")";
        myMainMenusBack[i].style.backgroundColor = "transparent";
        myMainMenusTop[i].style.height = loadedImages[i*2+1].height+'px';
        myMainMenusTop[i].style.width = loadedImages[i*2+1].width+'px';
    }
    for(var i=0;i<myMainMenusTop.length ; i++)
    {
        /*if(!newBrowser)
        {
            fadeControll.setOpacity(myMainMenusBack[i],0);
            fadeControll.setOpacity(myMainMenusTop[i],0);
        }**/
        
        myMainMenusTop[i].style.margin = 0 ;
        myMainMenusTop[i].style.backgroundImage = "url("+loadedImages[i*2].src+")";
        myMainMenusTop[i].style.height = loadedImages[i*2].height+'px';
        myMainMenusTop[i].style.width = loadedImages[i*2].width+'px';
        
        //adding the munu effect on menu objects↓
        mainIcon.push(new MainIconMenu(myMainMenusBack[i], myMainMenusTop[i],HS[i],120,HS[i]*-1+10,mainIconsID[i]));
    }
    
    iconMenu[0].style.position = 'absolute';
    iconMenu[0].style.top = '300px';
    iconMenu[0].style.marginTop = '0px';
    
    // transparent the icons↓
    if(newBrowser)
    {
        fadeControll.setOpacity(iconMenu[0],0,backIsReady);
    }
    
    //now its time to load second menu items 
    //start to load background↓
    // loadComplete();
    
    secondMenuLoad()
    
    //START TO FADE IN THE MENU↓
    //setInterval(pageControll,500);
    
    //time to load second menu imaged↓
        //makeMenu2();
}


/**load images of second menu icons*/
function secondMenuLoad()
{
    //allIconLoaded2();
    var icons_name = [];
    for(var i = 0 ; i < secondMenuVals.images.length ; i++)
    {
        icons_name.push(secondMenuVals.folder+
            secondMenuVals.images[i]+
            secondMenuVals.fileType);
    }
    loadThese(icons_name,allIconLoaded2);
}

/**second menu icons loaded*/
function allIconLoaded2()
{   
    //START TO FADE IN THE MENU↓
    setInterval(pageControll,500);
    
    //start to load background↓
    loadComplete();
    
    //alert('show add images on secons menus');
}

/**second menu icon is loaded*/
function secondMenuLoaded()
{
    //second menu loaded
    var secondMenu = getElementsByClassName('menu2_2');
    //var lisecondMenu[0]
    //☻13♠♦♣☻
    console.log('second menu');
}

/**fade in icons*/
function backIsReady()
{
    iconMenu[0].style.top = '300px';
    if(newBrowser)
    {
        fadeControll.fade(iconMenu[0],0,100);
    }
    else
    {
        for(var i=0;i<myMainMenusTop.length ; i++)
        {
            //Debug remove ↓
            //fadeControll.fade(myMainMenusBack[i],0,100);
            //fadeControll.fade(myMainMenusTop[i],0,100);
        }
    }
}

/**fade out icons*/
function hideBack()
{
    if(newBrowser)
    {
        fadeControll.fade(iconMenu[0],100,0,inactiveMenus,5);
    }
    else
    {
        for(var i=0;i<myMainMenusTop.length ; i++)
        {
            fadeControll.fade(myMainMenusBack[i],100,0,inactiveMenus,5);
            fadeControll.fade(myMainMenusTop[i],100,0,inactiveMenus,5);
        }
    }
}



var lastLogoOn=1;


function showLogo2()
{
    fadeControll.fade(getElementsByClassName('mainlogo2')[0],0,100);
}

function showLogo1()
{
    fadeControll.fade(getElementsByClassName('mainlogo1')[0],0,100);
    fadeControll.fade(getElementsByClassName('title')[0],0,100);
    fadeControll.fade(getElementsByClassName('hoo')[0],0,100);
}



/**swithch to small menu*/
function inactiveMenus()
{
    iconMenu[0].style.top = '-500px';
}


function showLogo(logoNumber)
{
    if(lastLogoOn==logoNumber)
    {
        return;
    }
    else if(lastLogoOn==1)
    {
        fadeControll.fade(getElementsByClassName('mainlogo1')[0],100,0,showLogo2);
        fadeControll.fade(getElementsByClassName('title')[0],100,0);
        fadeControll.fade(getElementsByClassName('hoo')[0],100,0);
    }
    else
    {
        fadeControll.fade(getElementsByClassName('mainlogo2')[0],100,0,showLogo1);
    }
    lastLogoOn = logoNumber;
}




/**call this whenewr you need to start page actions*/
function loadComplete()
{
    changeMyColor(backGround,"808080");
}

/**change to the specifies page*/
function pageControll()
{
    if(LastPage!=CurrentPage)
    {
        if(CurrentPage==0)
        {
            backIsReady();
            showLogo(1);
            changeMyColor(pixelss,1024,'width',5);
        }
        else
        {
            hideBack();
            showLogo(2);
            pixelss.style.width = '1024px';
            changeMyColor(pixelss,850,'width',5);
        }
        window.location.hash = CurrentPage;
        LastPage = CurrentPage ;
    }
    CurrentPage = Number(String(window.location.hash).substring(1));
}



//javascript: var im = window.document.getElementsByTagName('img');var v=0;setInterval(function() { v++; for(var i=0;i<im.length;i++) { im[i].style.position = "absolute" ; im[i].style.top = Number(im[i].offsetTop+v)+'px'; }},50);





//var elem = document.getElementsByTagName('li');
//for(var i=0 ; i<elem.length ; i++)
//{
//    elem[i];
//}

//var el = document.createElement('div');

//var content = document.createTextNode("<strong>salam</strong>");

//el.appendChild(content);
//el.style.color = "#ff0000";
//el.style.position = "absolute";

//document.body.appendChild(el);

////function anim()
//{
//    //el.style.top =1;
//    el.style.top = el.offsetTop-1+'px';
//}



//alert(Number("0xff0000"));

//setInterval(anim,10);

//alert(window.getComputedStyle(el,null).getPropertyValue("color"));


//var papa = document.getElementById("mainpage");

//papa.parentNode.insertBefore(el,papa);