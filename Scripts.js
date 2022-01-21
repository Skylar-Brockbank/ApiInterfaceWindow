//What we need

// -Get the player number from the user

// -Start the loop
//{
// -Make an API call and get the player position
// -Make a prox call to get location of other players
// -draw them to the canvas
// -send list of pressed keys to server
//}

//Parts
//================
//1.) canvas
//2.) key listener
//3.) API Connection

//pre loop setup
  //Controller Presets
var keysDown = {};
document.addEventListener("keydown",(e)=>{keysDown[e.keyCode] = true;}, false);
document.addEventListener('keyup',(e)=>{delete keysDown[e.keyCode];}, false);

  //Canvas Presets
var c = document.getElementById("playerCanvas");
var brush = c.getContext("2d");
c.width = c.parentNode.offsetWidth;
c.height = c.parentNode.offsetHeight;
c.parentNode.height = window.innerHeight/2;
c.parentNode.width= c.parentNode.height;
var q = c.height/7;

//big loop start
// setTimeout(()=>{requestAnimationFrame(go);} , 1000/10);
setInterval(go,1000/8);
//make a controller

function takeInput(){
  let keyStates=[(38 in keysDown ),(40 in keysDown),(39 in keysDown),(37 in keysDown)];
  // if (38 in keysDown ) {
  //   keyStates[0]=true;
  // }
  // if(40 in keysDown){
  //   keyStates[1]=true;
  // }
  // if(39 in keysDown){
  //   keyStates[2]=true;
  // }
  // if(37 in keysDown){
  //   keyStates[3]=true;
  // }
  return keyStates;
}


//draw results

//end big loop

//temp functions
function go()
{
  if (document.getElementById("player-selection").value!=0)
  {
    // let tempKeys = takeInput();
    // console.log(tempKeys);
    
    drawPlayers();
  }
}

async function drawPlayers()
{
  let tempKeys = takeInput();
  let henry = await GameApiService.con(document.getElementById("player-selection").value, tempKeys[0],tempKeys[1],tempKeys[2],tempKeys[3]);
  brush.clearRect(0,0,c.width, c.height);
  for(let i = 0; i<henry.length;i++)
  {
    drawPlayer(henry[i].x,henry[i].y);
  }
}
function drawPlayer(x,y)
{
  brush.fillStyle = "red";
  brush.beginPath();
  brush.arc(x*q,y*q,q/2,0,Math.PI*2,false);
  brush.fill();
}

class GameApiService {
  static async getPlayer(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/Players/${id}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }
  
  static async prox(x, y, z, range) {
    try {
      const response = await fetch(`http://localhost:5000/api/Players/prox/?x=${x}&y=${y}&z=${z}&range=${range}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }

  static async con(id, n, s, e, w)  {
    try {
      const response = await fetch(`http://localhost:5000/api/Players/con/${id}/?pId=${id}&n=${n}&s=${s}&e=${e}&w=${w}`);
      if(!response.ok) {
          throw Error(response.statusText);        
        }
        return response.json();
      } catch(error) {  
        return error.message;
      }
  }
  
  
}