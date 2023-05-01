import {world,system} from '@minecraft/server';
import { HttpRequestMethod, HttpHeader, HttpRequest, http  } from "@minecraft/server-net";

let removeInvalidCharRegex = /[\[\]`"\\\|\{\}\(\);<>]/g;

world.afterEvents.chatSend.subscribe((eventData)=>{
  let player = eventData.sender;
  let message = ":msg:" + eventData.message.replace(/ /g,"-").replace(removeInvalidCharRegex,"");  
  let playerInfo = "name:" + player.name + ":location:" + `${player.location.x},${player.location.y},${player.location.z}`;
  const request = new HttpRequest("http://localhost:8000/" + playerInfo + message);

  request.method = HttpRequestMethod.GET;

  http.request(request).then((response) => {  
    let command = response.body.includes("cmd");
    if(command){
      let getCommand = response.body.split("/")[1].split("\n")[0].replace(/'.+/g,"").replace(/[`']/,"");
      player.runCommandAsync(getCommand);
      player.sendMessage(`§e<Alex AI Command> ${getCommand}`);
      return;
    }     
    player.sendMessage(`§e<Alex AI> ${response.body}`);
  });

});