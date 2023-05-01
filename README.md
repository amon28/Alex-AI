# Alex-AI
Alex AI is a Minecraft Bedrock AI Chatbot Addon.\
You can talk to the AI in game, you can even ask it to run commands.
# Requirements
1. Latest Preview Version of Minecraft Bedrock PC
2. Node.js https://nodejs.org/en
3. Minecraft BDS For Preview https://www.minecraft.net/en-us/download/server/bedrock
4. An OpenAI account that has usage. https://platform.openai.com/account/usage

# Instruction
1. Open the Command Terminal and run **"npm install openai"**\
This will install necessary library for OpenAI to run.
2. Open the **ai_chat_server.js** and put your OpenAI api key\
https://platform.openai.com/account/api-keys
```
const configuration = new Configuration({
  apiKey: "Your OpenAI API Key",
});
```
3. Run the **"run http server.bat"**
This will start the http server and don't close it, this will not work if you don't have Node.js installed.
4. Open Command Terminal and run this\
**"CheckNetIsolation.exe LoopbackExempt -a -p=S-1-15-2-424268864-5579737-879501358-346833251-474568803-887069379-4040235476"**\
This command will allow you to connect to BDS. For more info https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptingservers
5. Before you run your Minecraft BDS, check the permissions first if it has **"@minecraft/server-net"** permission.
The permission.json file is located at, **your-bds-folder>config>default>permissions.json**\
It should look like this.
```
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}

```
6. Run your Minecraft BDS with the addon installed in the server world.
Easiest way to put the addon inside the server world is by creating a world in a normal game with the addon and transfer the world file to the server.\
**Don't forget to turn on experimental settings inside the world!**
7. All should now be setup, just join the world and type something in chat!

# Solutions To Some Problems
**My server can't read my world** - When transfering your world file to the server the world folder needs to be renamed. The default name is "Bedrock level".



