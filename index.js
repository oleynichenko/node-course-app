const packageInfo = require(`./package.json`);
const {handleCommand} = require(`./cli/index`);

const userText = process.argv.slice(2);

if (userText.length === 0) {
  console.log(`Приложение ${packageInfo.name}. Список доступных команд - "--help"`);
} else {
  const command = userText[0];

  handleCommand(command);
}
