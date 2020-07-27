
 function loadJSON(fileName, callback, async) {   

    if (async == undefined)
      async = true
      
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', fileName, async) 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText)
          }
    }
    xobj.send(null);  
 }

 export default loadJSON