
var up,down;var min1,sec1;var cmin1,csec1,cmin2,csec2;
function Minutes(data) {
for(var i=0;i<data.length;i++)
if(data.substring(i,i+1)==":")
break;
return(data.substring(0,i));
}
function Seconds(data) {
for(var i=0;i<data.length;i++)
if(data.substring(i,i+1)==":")
break;
return(data.substring(i+1,data.length));
}
function Display(min,sec) {
var disp;
if(min<=9) disp=" 0";
else disp="";
disp+=min+":";
if(sec<=9) disp+="0"+sec;
else disp+=sec;
return(disp);
}
function Up() {
cmin1=0;
csec1=0;
min1=0+Minutes(document.game.beg1.value);
sec1=0+Seconds(document.game.beg1.value);
UpRepeat();
}
function UpRepeat() {
csec1++;
if(csec1==60) {
csec1=0; cmin1++;
}
document.game.disp1.value=Display(cmin1,csec1);
if((cmin1==min1)&&(csec1==sec1))
alert("Game Over");
else up=setTimeout("UpRepeat()",1000);
}
function Down() {
cmin2=1*Minutes(document.game.beg2.value);
csec2=0+Seconds(document.game.beg2.value);
DownRepeat();
}
function DownRepeat() {
csec2--;
if(csec2==-1) {
csec2=59; cmin2--;
}
document.game.disp2.value=Display(cmin2,csec2);
if((cmin2==0)&&(csec2==0))
{
	alert("Game Over");
	document.game.question.value = "Game Over";
	document.game.answer.value = "";
	document.game.answer.disabled = "true";
}
else down=setTimeout("DownRepeat()",1000);
}
// End -->
