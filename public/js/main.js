let light = false;

function editCss(name, value)
{
  document.documentElement.style.setProperty(name, value); // change root:'s value 
}

function switchColor()
{

  if (!light)
  {
    editCss("--page-color", "#fff");
    editCss("--main-text-color", "#333");
    light = !light;
  }
  else
  {
    editCss("--page-color", "#222");
    editCss("--main-text-color", "#ddd");
    light = !light;
  }
  
}

// function getPFP(username)
// {
//codingandmemes was here
  // let xhr = new XMLHttpRequest();

  // xhr.open("POST", "repl.it/graphql");

  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.setRequestHeader("Accept", "application/json");
  // // xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
  // // xhr.setRequestHeader("Connection", "keep-alive");
  // xhr.setRequestHeader("X-Requested-With", "any");
  // xhr.setRequestHeader("Referrer", "https://repl.it");
  // // xhr.setRequestHeader("Origin", "https://repl.it");

  // xhr.send(JSON.stringify({query: `{userByUsername(username: ${username}) {image}}`}));

// }
onload = ()=>{
loader=document.getElementById("loadingProgressG")
loader.style.visibility = "hidden"
}

function logout(){
  loader.style.visibility = "visible"
  window.location = "/logout"
}

function login(){
  loader.style.visibility = "visible"
  window.location = "/app"
}