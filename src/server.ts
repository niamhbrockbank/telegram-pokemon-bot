import axios from 'axios';
import { Telegraf, Markup } from 'telegraf'
import capitaliseName from './util/capitaliseName';
import getBotTokenOrQuit from './util/getBotToken';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)



bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.help((ctx) => ctx.reply('I can get you a random pokemon, try /pokemon'))

//Get a pokemon name
bot.command('pokemon', async (ctx) => {
    try {
        const id = Math.round(Math.random() * 898)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const img = response.data.sprites.front_default
        const name = capitaliseName(response.data.name)
        ctx.reply(`This is ${name}`) 

        // const keyboard = Markup.inlineKeyboard([
        //     // Markup.button.url("❤️", "http://telegraf.js.org"),
        //     Markup.button.url("Learn more", "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)"),
        //     Markup.button.callback("More", 'more'),
        // ]);

        ctx.replyWithPhoto({url : img})
        
    } catch (error) {
        ctx.reply('Sorry, no can do')
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
