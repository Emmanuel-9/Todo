var d = new Date();
var time = d.getHours();


if (time<12){
    document.write("<b><p> Good Morning </p></b>");
}
else{
    document.write("<b><p>Good Afternoon!</p></b>");
}

document.getElementById("time").innerHTML = ti