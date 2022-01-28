require("dotenv").config();
const axios = require("axios");
const giphy = require('giphy-api')()

const { Client, Intents, TextChannel, NewsChannel } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

function monsterVoice(str){
  newStr = [];
  for( let i = 0; i < str.length; i++){
    if(i % 2 === 0){
     
     newStr.push(str[i].toUpperCase())
    } else {
      
      newStr.push(str[i].toLowerCase())
    }
  }
  return newStr.join('')
}


const PREFIX = "$"

client.on("ready", () => {
  console.log(`${client.user.username}'s eyes are opening...`);
  console.log("It's ALIVE!!!");
});

client.on("messageCreate", (messageCreate) => {
  console.log(`[${messageCreate.author.tag}]: ${messageCreate.content}`);

  if (messageCreate.content.startsWith(PREFIX)){
      const [CMD_NAME, ...args] = messageCreate.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
      console.log(CMD_NAME)
      console.log(args)

      if (CMD_NAME === "yeezy"){
        
      axios.get("https://api.kanye.rest/")
    .then(response => {
      const answer = monsterVoice(response.data.quote)

      messageCreate.reply(answer)
    })
  }

  if (CMD_NAME === "define"){
        
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`)
  .then(response => {
    const answer = response.data;
    const meaningsArr = answer[0].meanings

    messageCreate.reply(`${answer[0].origin} Definition: ${meaningsArr[0].definitions[0].definition}`)
    
  })
}




  }

  if (messageCreate.content === "hello") {
    messageCreate.reply("Guughhh...");
  }
  if (
    messageCreate.content === "fire" ||
    messageCreate.content === "Fire" ||
    messageCreate.content === "🔥"
  ) {
    messageCreate.reply("FIRE BAAAD!!!");
  }
  if (messageCreate.content === "ritz") {
    messageCreate.reply(
      "https://i.pinimg.com/originals/13/c1/37/13c13777a5ee6d90dcb3495385d0d438.gif"
    );
  }
  if (messageCreate.content === "wish me luck") {
    messageCreate.reply("GoOd lUcK...");
  }
});

client.login(process.env.DJS_BOT_TOKEN);
