require("dotenv").config();
const { Bot, GrammyError, HttpError, Keyboard} = require("grammy");

const bot = new Bot(process.env.APY_KEY_BOT);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота!",
  },
  {
    command: "sayhi",
    description:
      "Привет, привет! Ты кстати в курсе, что пока ты со мной здоровался на Земле от курения умер 1 человек?! Нет?! Ну привет!",
  },
]);

bot.command(["smoke", "stop"], async (ctx) => {
  await ctx.reply(
    "Это ссылка дает тебе возможность изучить вред от курения <span class='tg-spoiler'>зависимости</span> <a>https://www.who.int/ru/campaigns/connecting-the-world-to-combat-coronavirus/healthyathome/healthyathome---quitting-tobacco</a>",
    {
      parse_mode: "HTML",
    }
  )
});

bot.command("link", async (ctx) => {
  await ctx.react("🤓")
  await ctx.reply(
    "Привет, я здесь чтобы бросить курить и купить небоскреб\\! Тг канал с полезными текстами: [это ссылка](https://t.me/dlaj_druzej)",
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }
  );
});

bot.command('mood', async(ctx) => {
  const moodKeyBoard = new Keyboard().text('Хорошо бы бросить курить!').row().text('Хочу понять вред курения!').row().text('По приколу просто!').resized().oneTime()
  await ctx.reply('Зачем тебе этот бот?', {
    reply_markup: moodKeyBoard
  })
})

bot.hears('Хорошо бы бросить!', async (ctx) => {
  await ctx.react('👏')
  await ctx.reply('Круто!')
})

bot.hears('Хочу понять вред курения!', async (ctx) => {
  await ctx.react('🤝')
  await ctx.reply('Тут ты найдешь много полезного: [сайт ВОЗ](https://www.who.int/ru/campaigns/connecting-the-world-to-combat-coronavirus/healthyathome/healthyathome---quitting-tobacco)',
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true
    }
  )
})

bot.hears('По приколу просто!', async (smoke) => {
  await smoke.react('🤡')
  await smoke.reply('С курением шутки плохи! Курят лохи!')
})


bot.on(":voice", async (ctx) => {
  await ctx.reply("Спасибо, что рассказал!");
});

bot.on(":media", async (ctx) => {
  await ctx.reply("Впечатляющий контент!");
});

bot.on("::url", async (ctx) => {
  await ctx.reply("Спасибо за ссылочку!");
});

bot.command(["sayhi", "say_hello", "hello", "say_zdravo"], async (ctx) => {
  await ctx.reply(
    "Привет, привет! Ты кстати в курсе, что пока ты со мной здоровался на Земле от курения умер 1 человек?! Нет?! Ну привет!"
  );
});

bot.hears([/чипсы/, /мороженое/, /колу/], async (ctx) => {
  await ctx.reply("Будешь очен, очень, _жирным_ *прижирным*", {
    parse_mode: "MarkdownV2",
  });
});

bot.hears(["Ворона", "ворона"], async (ctx) => {
  await ctx.reply(" села на дерево!");
});

bot.hears(["Воробушек", "воробушек"], async (ctx) => {
  await ctx.reply(" сел на веточку!");
});

bot.hears([/хуй/, /пизда/, /блять/, /пидор/], async (ctx) => {
  await ctx.reply("И этим ртом ты целуешь маму?!");
});

bot.hears("ID", async (ctx) => {
  await ctx.reply(`Ваш ID: ${ctx.from.id}`);
  console.log(ctx.from.id);
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error ehile handling update ${ctx.update.update_id}: `);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request: ", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact telega: ", e);
  } else {
    console.error("Unknown error: ", e);
  }
});

bot.start();
