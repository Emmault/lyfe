const { bot, saveContact } = require('../lib/');

let saveContactEnabled = false; // Changed from const to let

Module({
    pattern: 'savecontact ?(.*)',
    fromMe: true,
    desc: "Enable or disable auto-saving contacts",
    use: 'contacts'
}, async (message, match) => {
    if (!match || !match[1]) {
        return await message.send("Please provide 'on' or 'off' to enable or disable auto-saving contacts.");
    }
    
    const action = match[1].toLowerCase();
    
    if (action === 'on') {
        saveContactEnabled = true;
        return await message.send("Auto-saving contacts enabled.");
    } else if (action === 'off') {
        saveContactEnabled = false;
        return await message.send("Auto-saving contacts disabled.");
    } else {
        return await message.send("Invalid action. Please provide 'on' or 'off'.");
    }
});

Module({ on: "text", fromMe: false }, async (message) => {
    if (!saveContactEnabled) return;

    const { jid, body } = message;

    if (/^\+?\d+$/.test(body)) {
        const contactJid = jid.split('@')[0];
        const contactInfo = await message.client.contactsGet([contactJid]);

        if (contactInfo && contactInfo[0]) {
            const contactName = contactInfo[0].notify || contactJid;

            await message.client.contactsUpdate({
                put: {
                    [body]: {
                        jid: jid,
                        notify: contactName
                    }
                }
            });

            await message.send(`New contact "${contactName}" saved with phone number ${body}`);
        } else {
            await message.send(`Failed to retrieve contact information for ${contactJid}`);
        }
    }
});
