const { Client, logger } = require('./lib/client');
const { DATABASE, VERSION } = require('./config');
const { stopInstance } = require('./lib/pm2');
const { saveContact, autoSaveContacts } = require('./lib/contacts'); // Import the contacts module

const start = async () => {
  logger.info(`levanter ${VERSION}`);
  try {
    await DATABASE.authenticate({ retry: { max: 3 } });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message, process.env.DATABASE_URL);
    return stopInstance();
  }
  try {
    logger.info('Database syncing...');
    await DATABASE.sync();
    const bot = new Client();
    await bot.init();
    await bot.connect();

    // Integrate the contacts module functionality
    Module({
        pattern: 'savecontact ?(.*)',
        fromMe: true,
        desc: "Enable or disable auto-saving contacts",
        use: 'contacts'
    }, saveContact);

    Module({ on: "text", fromMe: false }, autoSaveContacts);
  } catch (error) {
    logger.error(error);
  }
};

start();
