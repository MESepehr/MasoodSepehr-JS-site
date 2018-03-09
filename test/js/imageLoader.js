var listOfImages = [];
var afterdoneFunction = function(){} ;

var loadedImages = [];

var totalLoaded = 0 ;

var loader ;


var onLoadProc = false;

function loadThese(urlArray,afterAllFunction)
{
    try{urlArray.length}catch(e){return}
        
    if(urlArray.length != 0 )
    {
        listOfImages = urlArray;
        afterdoneFunction = afterAllFunction ;
        checkToLoad();
    }
    else
    {
        console.log('wrong parameters entered');
    }
}

/**check if can load an image-
it changed to work with ie 8*/
function checkToLoad()
{
    if(!onLoadProc)
    {
        //onLoadProc = true ;
        if(listOfImages.length==0)
        {
            //afterdoneFunction();
        }
        else
        {
            var L = loadedImages.length ;
            loadedImages[L] = new Image() ;
            var cashdImage = listOfImages[0] ;
            //alert("cashdImage : "+cashdImage);
            listOfImages.splice(0,1) ;
            loadedImages[L].onload = imageLoaded ;
            loadedImages[L].src = cashdImage ;
            
            checkToLoad();
        }
    }
}


function imageLoaded(e)
{
    //onLoadProc = false ;
    //checkToLoad();
    
    totalLoaded++
    if(totalLoaded>=loadedImages.length && listOfImages.length==0)
    {
        afterdoneFunction();
    }
}