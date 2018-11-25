function drawvolumecontroller(length,height,nowselected){    
    document.getElementById("volumcontroller").innerHTML = "";
    for (i=0;i<length;i++){
        magassag = 7 + Math.round((1.4)*(length - i)); 
        margintop = height-magassag;
        if (margintop <= 0) {margintop=0;}
        if (i >= nowselected){        
            document.getElementById("volumcontroller").innerHTML = 
            document.getElementById("volumcontroller").innerHTML + 
            '<div  onmouseup="volumecontrolchanged(' + i + 
            ')" style="background-color:#898989;height:' + magassag + 
            'px;margin-top:'+margintop+'px;" class="volumecontrollerbar"></div>';
        } else {
            document.getElementById("volumcontroller").innerHTML = 
            document.getElementById("volumcontroller").innerHTML + 
            '<div  onmouseup="volumecontrolchanged(' + i + 
            ')" style="height:'+magassag+'px;margin-top:' + margintop + 
            'px;"class="volumecontrollerbar"></div>';
        }        
    }    
}
function volumecontrolchanged(newvolume){
    drawvolumecontroller(20,35,newvolume);
    document.getElementById("volumeindicator").innerHTML = newvolume;
}
