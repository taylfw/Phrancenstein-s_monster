require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`${client.user.username}'s eyes are opening...`);
  console.log("It's ALIVE!!!");
});

client.on("messageCreate", (messageCreate) => {
  console.log(`[${messageCreate.author.tag}]: ${messageCreate.content}`);
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
