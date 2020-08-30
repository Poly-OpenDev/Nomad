let light = false;
const headers = Headers.get();

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
