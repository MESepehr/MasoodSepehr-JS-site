if(window.getElementsByClassName == undefined)
{
    window.getElementsByClassName = getClass ;
    getElementsByClassName = getClass ;
}

//alert('foundeds : '+window.getElementsByClassName('icons_back').length);

function getClass(className)
{
    return getAllElementInWithName(document,className);
}

/**returns all elements with inserted class name*/
function getAllElementInWithName(baseTarget,myClassName)
{
    var founded = [] ;
    
    
    
    var back = false ;
    try
    {
        if(baseTarget.childNodes == undefined)
        {
           back = true ;
        }
    }
    catch(e)
    {
        back = true ;
    }
    if(back)
    {
        return founded;
    }
    
    for(var i=0 ; i<baseTarget.childNodes.length ; i++)
    {
        if(baseTarget.childNodes[i].className == undefined)
        {
            continue ;
        }
        if(baseTarget.childNodes[i].className == myClassName)
        {
            founded.push(baseTarget.childNodes[i]);
        }
        founded = founded.concat( getAllElementInWithName(baseTarget.childNodes[i],myClassName));
    }
    
    return founded ;
}