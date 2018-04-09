const Botmaster = require('botmaster');
const botmaster = new Botmaster();

const MessengerBot = require('botmaster-messenger');
const TwitterBot = require('botmaster-twitter-dm');

const messengerSettings = {
  credentials: {
    verifyToken: 'YOUR verifyToken',
    pageToken: 'YOUR pageToken',
    fbAppSecret: 'YOUR fbAppSecret',
  },
  webhookEndpoint: 'fb_webhook_FJrNX6sfH7QbJwCWHeBG', // botmaster will mount this webhook on https://Your_Domain_Name/messenger/fb_webhook_FJrNX6sfH7QbJwCWHeBG
};

const twitterSettings = {
  credentials: {
    consumerKey: 'YOUR consumerKey',
    consumerSecret: 'YOUR consumerSecret',
    accessToken: 'YOUR accessToken',
    accessTokenSecret: 'YOUR accessTokenSecret',
  }
}

const messengerBot = new MessengerBot(messengerSettings);
const twitterBot = new TwitterBot(twitterSettings);

botmaster.use({
  type: 'incoming',
  name: 'THP social incomming middleware',
  controller: thpSocialIncommingMiddleware
});

function thpSocialIncommingMiddleware(bot, update) {
  if (update.message.text === 'hi') {
    return bot.reply(update, 'well hi right back at you');
  } else if (update.message.text.indexOf('weather') > -1) {
    return bot.sendTextMessageTo('It is currently sunny in Philadelphia', update.sender.id);
  } else {
    const messages = ['I\'m sorry about this.',
                      'But it seems like I couldn\'t understand your message.',
                      'Could you try reformulating it?']
    return bot.sendTextCascadeTo(messages, update.sender.id)
  }
}
