/**this js will create console object if neaded*/

var createConsole = false ;
try{
    if(console==undefined)
    {
        createConsole = true ;
    }
}
catch(e)
{
    createConsole = true ;
}
if(createConsole)
{
    console = Object();
    console.log = function(text)
    {
        //alert(text);
    }
}