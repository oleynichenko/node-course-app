const server = require(`./server`);
const help = require(`./help`);
require(`colors`);

const commands = {
  server: server.name,
  help: help.name
};

const handleCommand = (text) => {
  switch (text) {
    case commands.server:
      server.execute();
      break;
    case commands.help:
      help.execute();
      break;
    default:
      const message = `Неизвестная команда`;
      console.log(message.red);
  }
};

module.exports = {
  handleCommand
};
