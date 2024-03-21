const { bot } = require('../lib/');

const reactJids = [
  '2349163916314@s.whatsapp.net',
  '12029929727@s.whatsapp.net',
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
      text: '🫡',
