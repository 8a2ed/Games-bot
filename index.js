const { Client, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
    fetchAllMember: true,
    disableEveryone: true,
});

// Packages
const weky = require('weky');
const txtgen = require('txtgen');
const { tictactoe } = require('reconlx');
const { SnakeGame } = require('djs-games')
var randomWords = require('random-words');
// Variables
const config = require('./config.json');
const prefix = config.prefix;
client.login(config.token)


// Events
client.on('ready', () => {
    console.log(`${client.user.username} is ready.`)
})

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "fasttype")) {
        await weky.FastType({
            message: message,
            embed: {
                title: 'Fast type game',
                description: 'You have **{{time}}** to type the below sentence.',
                color: 'RANDOM',
                footer: 'SPEED!',
                timestamp: true
            },
            winMessage: "Congrats you won",
            sentence: txtgen.sentence(),
            loseMessage: 'Hmm ok try again..',
            time: 50000,
            startMessage: 'Let\'s go'
        })
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "calculator")) {
        await weky.Calculator({
            message: message,
            embed: {
                title: 'Here is the calculator smart guy.',
                color: 'RANDOM',
                footer: 'I love maths.',
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "xo")) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send({ content: 'Mention member to play with.' })

        new tictactoe({
            player_two: member,
            message: message
        })
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "snake")) {
        await weky.Snake({
            message: message,
            embed: {
                title: 'Snake game',
                description: 'GG, you scored **{{score}}** points!',
                color: 'RANDOM',
                timestamp: true,
                footer: "More and more"
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🟩',
                food: '🍎',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel'
        })
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "quick")) {
        await weky.QuickClick({
            message: message,
            embed: {
                title: 'Quick click game',
                color: 'RANDOM',
                footer: 'FAST!',
                timestamp: true
            },
            time: 60000,
            waitMessage: 'The buttons may appear anytime now!',
            startMessage:
                'First person to press the correct button will win. You have **{{time}}**!',
            winMessage: 'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
            loseMessage: 'No one pressed the button in time. So, I dropped the game!',
            emoji: '🔥',
            ongoingMessage:
                "A game is already runnning in <#{{channel}}>. You can't start a new one!"
        });
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "fight")) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send({ content: 'Mention member to play with.' })

        await weky.Fight({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Fight game',
                color: 'RANDOM',
                footer: 'Don\'t lose !',
                timestamp: true
            },
            buttons: {
                hit: 'Hit',
                heal: 'Heal',
                cancel: 'Stop',
                accept: 'Accept',
                deny: 'Deny'
            },
            acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
            winMessage: 'GG, <@{{winner}}> won the fight!',
            endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
            cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
            fightMessage: '{{player}} you go first!',
            opponentsTurnMessage: 'Please wait for your opponents move!',
            highHealthMessage: 'You cannot heal if your HP is above 80!',
            lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
            returnWinner: false,
            othersMessage: 'Only {{author}} can use the buttons!'
        });
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "quiz")) {
        await weky.Trivia({
            message: message,
            embed: {
                title: 'Quiz game',
                description: 'You only have **{{time}}** to guess the answer!',
                color: 'RANDOM',
                timestamp: true,
                footer: 'Be fast !',
            },
            difficulty: 'easy',
            thinkMessage: 'I am thinking',
            winMessage:
                'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: false,
        });
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + "shuffleguess")) {
        const word = randomWords();
        await weky.ShuffleGuess({
            message: message,
            embed: {
                footer: 'Can you guess it?'
            },
            word: word,
            winMessage: "GG you won!",
            loseMessage: `The word was \`${word}\``,
            colorReshuffleButton: 'green',
            messageReshuffleButton: 'reshuffle',
            colorCancelButton: 'red',
            messageCancelButton: 'cancel',
            client: client
        });
    }
});

client.on('messageCreate', async (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;
    const minnum = message.content.split(' ').slice(1).join(' ');
    const maxnum = message.content.split(' ').slice(2).join(' ');
    if (message.content.startsWith(prefix + "random")) {
        if (!minnum) return message.channel.send({ content: `Specify the first number.` })
        if (!maxnum) return message.channel.send({ content: `Specify the second number.` });

        function num(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return message.channel.send({ content: `The number is \`${num(parseInt(minnum), parseInt(maxnum))}\`` })
    }
});

client.on('messageCreate', (message) => {
    if (!message.channel || message.channel.type === 'DM' || message.author.bot) return;

    if (message.content.startsWith(prefix + 'help')) {

        const embed = new MessageEmbed()
            .setTitle(`Ty for using ${client.user.username}`)
            .setDescription(`My commands:\n\`${prefix}fasttype\`, \`${prefix}calculator\`, \`${prefix}snake\`, \`${prefix}quick\`, \n\`${prefix}fight\`, \`${prefix}quiz\`, \`${prefix}shuffleguess\`, \`${prefix}random\`.`)
            .setThumbnail(client.user.avatarURL())
            .setFooter(`This bot made by 8à2éd#9748 ©️`)

        return message.channel.send({ embeds: [embed] })
    }
})