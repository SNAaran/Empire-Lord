(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const ms = require("ms")
    let https = require("https")
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.16.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@14.14.1`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    var prefix, arguments2, commandwithprefix, command;
    
    function mathRandomInt(a, b) {
      if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
      }
      return Math.floor(Math.random() * (b - a + 1) + a);
    }
    
    
    await s4d.client.login(TOKEN).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      prefix = '>';
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      arguments2 = (s4dmessage.content).split(' ');
      commandwithprefix = arguments2.splice(0, 1)[0];
      if ((commandwithprefix || '').startsWith(prefix || '')) {
        command = commandwithprefix.slice(((prefix.length + 1) - 1), commandwithprefix.length);
        if (command == 'Roll') {
          s4dmessage.channel.send({content:String(('Player 1 - ' + String(mathRandomInt(0, 50))))});
          s4dmessage.channel.send({content:String(('Player 2 - ' + String(mathRandomInt(0, 50))))});
          s4dmessage.channel.send({content:String(('Player 3 - ' + String(mathRandomInt(0, 50))))});
        }
        if (command == 'help') {
          s4dmessage.channel.send({content:String('My prefix >')});
          s4dmessage.channel.send({content:String('Commands - ')});
          s4dmessage.channel.send({content:String(' 1. Roll - To get players on Teamraid Time.')});
          s4dmessage.channel.send({content:String(' 2. Raid Guide - To get better tips of Raid and Teamraid')});
          s4dmessage.channel.send({content:String(' 3. Claim Guide - To get better tips of Claiming')});
          s4dmessage.channel.send({content:String(' 4. Sell Guide - To get better tips of Selling Materials')});
          s4dmessage.channel.send({content:String(' 5. Farm Guide - To get better tips of Farms')});
          s4dmessage.channel.send({content:String(' 6. Payday Guide - To get better tips of Payday')});
          s4dmessage.channel.send({content:String(' 7. Beginner Guide - A simple guide for beginners')});
        }
      }
    
    });
    
    return s4d
})();
