
$(document).ready(function () {
    var i, numberOfElements, timesindex = [], timesvalues = [], offset = 0, title = "", secondsfirst, d;
    var debug = false;
    
    function setTime(name, time, size){
        if(typeof(size)==='undefined') size = 2;
        init(name, size);
        
        if(timesindex.indexOf(name) == -1){
            timesindex.push(name);
            return;
        }else if(timesvalues[timesindex.indexOf(name)] != time){
            timesvalues[timesindex.indexOf(name)] = time;
        }else return;
        
        
        title = "";        
        for(var k = 0; k < size; k++){
            if(String(time).split("").length != size)
            secondsfirst = String(time).split("")[size-String(time).split("").length-k];
            else secondsfirst = String(time).split("")[k];

            secondsfirst = (parseInt(secondsfirst, 10).toString(2));
            title += "(" + secondsfirst + ")," ;

            secondsfirst = secondsfirst.split("");
            secondsfirst.reverse();

            for(var i1; i1 < size +1- secondsfirst.length; i1++){
                secondsfirst.splice(0,0, "0".split(""));
            }
            
            for (i = 0; i < 4; i++) { 
                   var $object = $("#"+name+ "-"+ k + "-"+ (3-i));
                  console.log($object.css("background-color"));
                 if(secondsfirst[i]=="1" && $object.css("background-color") == "rgb(51, 51, 51)"){
                     $object.velocity("transition.bounceIn");
                     $object.css("background-color", "#00FF2F");
                 }else if(secondsfirst[i] !="1" && $object.css("background-color") != "rgb(51, 51, 51)" ){
                     $object.css("background-color", "#333333");
                 }
             }
        }
        if(debug){
            $('.debug .'+name).html("");
            $('.debug .'+name).append(name.capitalize() + ": " + time + " || " + title +"<br>");
        }
        return time;
    }
    
    function init(name, size){
        if(typeof(size)==='undefined') size = 2;
        if(document.getElementById(name) !== null){
            return false;
        }else{
            $(".clock").append("<div id='"+name+"' ></div");
            var width = 100/(numberOfElements);
            var labelset = 0;
            for(var k = 0; k < size; k++){
                for(i = 0; i < 4; i++){
                    $("#" + name).append("<div class='"+name+" time' id='" + name + "-" + k + "-" + i + "' ></div>");
                    $("#" + name + "-"+ k + "-" + i).css("top", String(i * 25+width/3) + "%");
                    $("#" + name + "-"+ k + "-"+ i).css("left", (width * offset + width / 5.5) + "%");
                    $("#"+ name + "-"+ k + "-"+ i).css("width", (width/1.5 + "%"));

                }
                offset++;
                labelset++;
            }
           $(".labels").append("<div class='label label"+name+"'>"+name.capitalize()+"</div>");
           $(".label" + name).css("left", ((width * size + width/5.5 )   - $(".label" + name).width()/100) + "%");
            
            $(".debug").append("<div class='"+name+"'></div>");
        }
        return true;
    }
    
    function loop(){
        d = new Date();
        numberOfElements = 9;
        
        setTime("hour", d.getHours());
        setTime("minutes", d.getMinutes());
        setTime("seconds", d.getSeconds());
        setTime("milliseconds", d.getMilliseconds(), 3);

        title = "";
        setTimeout(function(){loop()}, 1);
    }
  
    loop();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
