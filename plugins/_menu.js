const bot = require('../lib/events');
const { addSpace, textToStylist, PREFIX, getUptime, PLUGINS, getRam } = require('../lib/');

// Help command to display available commands
bot.addCommand(
  {
    pattern: 'help ?(.*)',
    fromMe: true,
    dontAddCommandList: true,
  },
  async (message, match) => {
    const sorted = bot.commands.filter(command => !command.dontAddCommandList && command.pattern !== undefined).sort((a, b) => a.name.localeCompare(b.name));
    const date = new Date();
    let CMD_HELP = `╭────────────────╮
						𝙼𝙸𝙰 𝙼𝙳 v2.0 ⚠︎
╰────────────────╯

╭────────────────
│ Prefix : ${PREFIX}
│ User : ${message.pushName}
│ Time : ${date.toLocaleTimeString()}
│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
│ Date : ${date.toLocaleDateString('hi')}
│ Version : ${VERSION}
│ Plugins : ${PLUGINS.count}
│ Ram : ${getRam()}
│ Uptime : ${getUptime('t')}
╰────────────────
╭────────────────
`;
    sorted.forEach((command, i) => {
      CMD_HELP += `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(command.name.toUpperCase(), 'mono')}\n`;
    });
    CMD_HELP += `╰────────────────`;
    return await message.send('```' + CMD_HELP + '```');
  }
);

// List command to display a list of available commands and their descriptions
bot.addCommand(
  {
    pattern: 'list ?(.*)',
    fromMe: true,
    dontAddCommandList: true,
  },
  async (message, match) => {
    let msg = '';
    const sorted = bot.commands.filter(command => !command.dontAddCommandList && command.pattern !== undefined).sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach((command, index) => {
      msg += `${index + 1} ${command.name}\n${command.desc}\n\n`;
    });
    await message.send('```' + msg.trim() + '```');
  }
);

// Menu command to display a categorized list of available commands
bot.addCommand(
  {
    pattern: 'menu ?(.*)',
    fromMe: true,
    dontAddCommandList: true,
  },
  async (message, match) => {
    const commands = {};
    bot.commands.filter(command => !command.dontAddCommandList && command.pattern !== undefined).forEach(command => {
      const cmdType = command.type.toLowerCase();
      if (!commands[cmdType]) commands[cmdType] = [];
      const isDisabled = command.active === false;
      const cmd = command.name.trim();
      commands[cmdType].push(isDisabled ? `${cmd} [disabled]` : cmd);
    });
    const date = new Date();
    let msg = `\`\`\`╭═══ 𝙼𝙸𝙰 𝙼𝙳 v2.0 ⚠︎ ═══⊷
┃❃╭──────────────
┃❃│ Prefix : ${PREFIX}
┃❃│ User : ${message.pushName}
┃❃│ Time : ${date.toLocaleTimeString()}
┃❃│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
┃❃│ Date : ${date.toLocaleDateString('hi')}
┃❃│ Version : ${VERSION}
┃❃│ Plugins : ${PLUGINS.count}
┃❃│ Ram : ${getRam()}
┃❃│ Uptime : ${getUptime('t')}
┃❃╰───────────────
╰═════════════════⊷\`\`\`\n`;

    if (match && commands[match]) {
      msg += ` ╭─❏ ${textToStylist(match.toLowerCase(), 'smallcaps')} ❏\n`;
      commands[match].forEach(plugin => msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`);
      msg += ` ╰─────────────────`;
    } else {
      for (const command in commands) {
        msg += ` ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`;
        commands[command].forEach(plugin => msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`);
        msg += ` ╰─────────────────\n`;
      }
    }
    await message.send(msg.trim());
  }
);
