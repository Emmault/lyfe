const { bot } = require('../lib/');

const reactJids = [
  '34629457652-1355412265@g.us',
  '120363026894486244@g.us',
  '2349163916314@s.whatsapp.net',
  // Add more JIDs as needed
];
/* 
bot(
  {
    pattern: 'autorct ?(.*)',
    fromMe: false,
    desc: 'Creates fancy text from given text',
    type: 'misc',
  },
  async (message, match) => {
    // 
    // ...
  }
);
*/
bot({ on: 'text', fromMe: false, type: 'ap' }, async (message, match) => {
  if (!message.fromMe && reactJids.includes(message.jid)) {
    const react = {
      text: '🫠',
      key: message.message.key,
    };
    return await message.send(react, {}, 'react');
  }
});
