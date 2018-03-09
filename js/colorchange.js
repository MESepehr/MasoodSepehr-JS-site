var objects = new Array();

var reds = new Array();
var greens = new Array();
var bluses = new Array();

var currentSize = new Array();

var desReds = new Array();
var desBlues = new Array();
var desGreens = new Array();

var desSize = new Array();

var atrib = new Array();
var animSp = new Array();

var intervalID = -1 ;


//yourNumber.toString(16);
//yourNumber = parseInt(hexString, 16);

/**insert color atribute like backgroungColor as string*/
function changeMyColor(HTMLObject,newColor,colorAtrib,animSpeed)
{
    if(colorAtrib==undefined)
    {
        colorAtrib = 'backgroundColor';
    }
    
    if(animSpeed==undefined)
    {
        animSpeed = 10;
    }
    
    var col = String(HTMLObject.style[colorAtrib]);//"#ff00ff";//
    var current
    
    
    var sourCol = getRGBInArray(col);//current color
    var destCol = getRGBInArray(newColor);//destination color
    
    if(colorAtrib.toLowerCase().indexOf('color')!=-1 && (sourCol[0]==-1 || destCol[0]==-1))
    {
        console.log('attribute cant take color');
    }
    else if(colorAtrib.toLowerCase().indexOf('color')==-1)
    {
        objects.push(HTMLObject);
        
        atrib.push(colorAtrib);
        animSp.push(animSpeed);
        
        //alert(sourCol[0]+' vs '+destCol[0]);
        reds.push(undefined);
        greens.push(undefined);
        bluses.push(undefined);

        desReds.push(undefined);
        desBlues.push(undefined);
        desGreens.push(undefined);
        
        currentSize.push(parseInt(HTMLObject.style[colorAtrib]));
        if(isNaN(currentSize[currentSize.length-1]))
        {
            currentSize[currentSize.length-1] = newColor ;
        }
        desSize.push(newColor);
    }
    else
    {
        
        objects.push(HTMLObject);
        
        atrib.push(colorAtrib);
        animSp.push(animSpeed);
        
        //alert(sourCol[0]+' vs '+destCol[0]);
        reds.push(sourCol[0]);
        greens.push(sourCol[1]);
        bluses.push(sourCol[2]);

        desReds.push(destCol[0]);
        desBlues.push(destCol[1]);
        desGreens.push(destCol[2]);
        
        currentSize.push(undefined);
        desSize.push(undefined);
    }
    
    if(intervalID==-1)
    {
        intervalID = setInterval(colorControl,80)
    }
}



/**animate the colors*/
function colorControl()
{
    var removethem = [];
    for(var i=0 ; i<objects.length ; i++)
    {
        //console.log(reds[i]);
        if(reds[i]!=undefined)
        {
            reds[i] += (desReds[i]-reds[i])/animSp[i];
            greens[i] += (desGreens[i]-greens[i])/animSp[i];
            bluses[i] += (desBlues[i]-bluses[i])/animSp[i];
            
            var myR = Math.ceil(reds[i]),
                myG = Math.ceil(greens[i]),
                myB = Math.ceil(bluses[i]);
            
            var newCol =    '#'+
                            myR.toString(16)+
                            myG.toString(16)+
                            myB.toString(16);
            objects[i].style[atrib[i]] = newCol ;
            if(myR<=desReds[i]+1 && myR>=desReds[i]-1 &&
               myG <= desGreens[i]+1 && myG >= desGreens[i]-1 &&
               myB <= desBlues[i]+1 && myB >= desBlues[i]-1)
            {
                //console.log('true');
                objects.splice(i,1);
                
                reds.splice(i,1);
                greens.splice(i,1);
                bluses.splice(i,1);
                
                desReds.splice(i,1);
                desBlues.splice(i,1);
                desGreens.splice(i,1);
                
                animSp.splice(i,1);
                atrib.splice(i,1);
        
                currentSize.splice(i,1);
                desSize.splice(i,1);
            }
        }
        else
        {
            currentSize[i] += (desSize[i]-currentSize[i])/animSp[i];
            objects[i].style[atrib[i]] = currentSize[i]+'px' ;
            if(currentSize[i]<=desSize[i]+1 && currentSize>=desSize[i]-1)
            {
                //console.log('true');
                objects.splice(i,1);
                
                reds.splice(i,1);
                greens.splice(i,1);
                bluses.splice(i,1);
                
                desReds.splice(i,1);
                desBlues.splice(i,1);
                desGreens.splice(i,1);
                
                animSp.splice(i,1);
                atrib.splice(i,1);
        
                currentSize.splice(i,1);
                desSize.splice(i,1);
            }
        }
    }
}



/**get the rgb color from strinf*/
function getRGBInArray(col)//:Array
{
    col = String(col);
    
    var colors = [-1,-1,-1];
    if(col.length==6)
    {
        col = "#"+col;
    }
    
    if(col.indexOf('#')!=-1)
    {
        col = col.substring(1);
        
        var parsed = parseInt(col,16);
        var cashCol = parsed%256;//blue
        colors[2] = cashCol ;
        parsed = (parsed-cashCol)/256;//remove blue
        
        cashCol = parsed%256;//green
        colors[1] = cashCol ;
        parsed = (parsed-cashCol)/256;//remove green
        
        cashCol = parsed ;//red
        colors[0] = cashCol ;
    }
    else if(col.indexOf('rgb')!=-1)
    {
        col = col.substring(4,col.length-1);
        col = col.split(', ');
        
        colors[0] = Number(col[0]);
        colors[1] = Number(col[1]);
        colors[2] = Number(col[2]);
    }
    else
    {
        //console.error("UNDEFINED TYPE OF COLOR");
    }
    
    //console.log(colors[0]+' , '+colors[1]+' , '+colors[2]);
    
    return colors ;
}



function getCurrentStyle(target,atribute)
{
    if(typeof target.currentStyle != 'undefined')
    {
        return target.currentStyle[atribute];
    }
    else
    {
        return window.getComputedStyle(target).getPropertyValue(atribute);
    }
}