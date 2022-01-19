var d = new Date();
var time = d.getHours();


if (time<12){
    document.write("<b><p> Good Morning! </p></b>");
}
else{
    document.write("<b><p>Good Afternoon!</p></b>");
}

document.getElementById("time").innerHTML = d;

 

document.querySelector('#update').addEventListener('click', () => {
    fetch('/', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Welcome to Programming',
        
      }).then(res => {
        if (res.ok)
        return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
    })
  })