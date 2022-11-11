require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");


const { Client, Intents, TextChannel, NewsChannel,  GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const configuration = new Configuration({
  organization: 'org-KEZTOYi19c4LyIlkUTrnJEXw',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


//This function takes strings and mAkEs ThEm lOoK LiKe tHiS. 

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


const PREFIX = "pm "


client.on("ready", () => {
  console.log(`${client.user.username}'s eyes are opening...`);
  console.log("It's ALIVE!!!");
});

client.on("messageCreate", (messageCreate) => {
  console.log(`[${messageCreate.author.tag}]: ${messageCreate}`);


  //This part is for all my api calls.

  if (messageCreate.content.startsWith(PREFIX)){
      const [CMD_NAME, ...args] = messageCreate.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
      console.log(CMD_NAME)
      console.log(args)

      //kanye.rest api
      if (CMD_NAME === "yeezy"){
        
        axios.get("https://api.kanye.rest/")
      .then(response => {
        const answer = monsterVoice(response.data.quote)

        messageCreate.reply(answer)
      })
    }

    //definition api
    if (CMD_NAME === "define"){
          
      axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`)
    .then(response => {
      const answer = response.data;
      const meaningsArr = answer[0].meanings
      const finalAnswer = meaningsArr[0].definitions[0].definition

      messageCreate.reply(finalAnswer)
      
    })
  }

  //openweather api (not working yet)
  if (CMD_NAME === "weather"){
    axios.get(`api.openweathermap.org/data/2.5/weather?id=4160021&appid=b3eb673545cc3461126ed042c629a2e5`)
      .then(response => {
        const answer = response
        console.log(answer);
        // messageCreate.reply(answer)
      })
    }

    //not an api, but just uplifting 😁
  if(CMD_NAME === "encourage"){

    messageCreate.reply("You're awesome, " + args[0])

  }

    //openai
    let prompt =``;
 
  if(CMD_NAME === 'ai'){
    prompt += `You: ${messageCreate.content}\n`;
  (async () => {
        
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.9,
            top_p: 0.8,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          });
          // console.log(gptResponse.data.choices[0].text.substring(0))
        messageCreate.reply(`\`\`\`${gptResponse.data.choices[0].text.substring(0)}\`\`\``);
        // prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
  }

  //adding dall-e functionality
  if(CMD_NAME === 'draw'){
    prompt += `${messageCreate.content}\n`;
    (async () =>{
      
      console.log(openai)
      const response = await openai.createImage({
        prompt: "",
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data.data[0].url;
    })();
  }

}


//general responses to user messages.

  if (messageCreate.content === "hello") {
    messageCreate.reply("Guughhh...");
  }
  if (
    messageCreate.content.includes("fire")  ||
    messageCreate.content.includes("Fire") ||
    messageCreate.content.includes("🔥")
  ) {
    messageCreate.reply("FIRE BAAAD!!!");
  }
  if (messageCreate.content.includes("ritz")) {
    messageCreate.reply(
      "https://i.pinimg.com/originals/13/c1/37/13c13777a5ee6d90dcb3495385d0d438.gif"
    );
  }
  if (messageCreate.content === "wish me luck") {
    messageCreate.reply("GoOd lUcK...");
  }
  
});

client.login(process.env.DJS_BOT_TOKEN);
