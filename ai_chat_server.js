const { Configuration, OpenAIApi } = require("openai");

const http = require("http");
const host = 'localhost';
const port = 8000;

let messageHistory = [
    {"role": "system", "content": "There 3 dimensions in minecraft, nether, overworld, and the_end"},
    {"role": "system", "content": "Output Restriction. Instead of saying minecraft:the_nether use nether"},
    {"role": "system", "content": "Output Restriction. Do not add the 'minecraft:' namespace in names"},
    {"role": "system", "content": "Output Restriction. When placing a block instead putting the block data value use '[]'. For example '/fill ~ ~ ~ ~ ~ ~ dirt [] replace air' or '/setblock ~ ~ ~ stone []'"},
    {"role": "system", "content": "You are a helpful and knowledgeable Minecraft Bedrock Edition assistant that acts like a player or a human."},
    {"role": "system", "content": "Output Restriction. When generating a Minecraft Bedrock Command only output the command with the word cmd. For Example 'cmd /time set day'. In your response include the command with the word cmd."},
    {"role": "user", "content": "Teleport me 2 blocks up."},
    {"role": "assistant", "content": "cmd /teleport Dewdimpple ~ ~2 ~"},
    //{"role": "system", "content": "Output Restriction. When generating a Minecraft Bedrock Command use the name of the user. For Example '/gamemode survival Dewdimpple'. In your response include the name of the user with the command."},
    {"role": "user", "content": "Turn me to survival."},
    {"role": "assistant", "content": "cmd /gamemode survival Dewdimpple"},
    {"role": "system", "content": "Output Restriction. When generating a Minecraft Bedrock Command with effect use the update syntax. For Example '/effect Dewdimpple strength 10 1'. Use the updated syntax for the effect command."},
    {"role": "user", "content": "I want 3 diamonds"},
    {"role": "assistant", "content": "cmd /give Dewdimpple diamond 3"},
    {"role": "system", "content": "When the user wants to teleport to another dimension for example the nether use the command '/execute as Dewdimpple in nether run tp ~ ~ ~'"},
    {"role": "user", "content": "Teleport me to the nether"},
    {"role": "assistant", "content": "cmd /execute as Dewdimpple nether run run tp ~ ~ ~"},
    {"role": "user", "content": "locate a birch forest biome"},
    {"role": "assistant", "content": "cmd /locate biome birch_forest"},
];

const configuration = new Configuration({
  apiKey: "Your OpenAI API Key",
});
const openai = new OpenAIApi(configuration);

async function chatPrompt(prompt){
let newPrompt = prompt.replace("/","").replace(/-/g," ");
messageHistory.push({"role": "user", "content": newPrompt});

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  temperature: 0.5,
  max_tokens: 150,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  messages: messageHistory,
});

messageHistory.push({"role": "assistant", "content": response.data.choices[0].message.content});
return response.data.choices[0].message.content;
}

const requestListener = function(req, res){
    res.writeHead(200);
    let request;
    playerInfo(req.url);
    request = req.url.toString().split("msg:")[1];
    chatPrompt(request).then(function (result){      
      res.end(result);    
    });
}

function playerInfo(infos){
  let playerInformation = infos.toString();
  messageHistory.push({"role": "system", "content": "The user or player is " + playerInformation.split(":")[1]});
  messageHistory.push({"role": "system", "content": "The user new coordinate location is " + playerInformation.split(":")[3]});
  return playerInformation;
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`); 
});