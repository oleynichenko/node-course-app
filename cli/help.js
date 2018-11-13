require(`colors`);
const server = require(`./server`);
const fill = require(`./fill`);

const LINE_LENGTH = 15;

module.exports = {
  name: `--help`,
  description: `shows list of commands`,
  execute() {
    const serverItem = server.name.padEnd(LINE_LENGTH);
    const fillItem = fill.name.padEnd(LINE_LENGTH);
    const helpItem = this.name.padEnd(LINE_LENGTH);

    console.log(`${serverItem.blue} - ${server.description.green}`);
    console.log(`${helpItem.blue} - ${this.description.green}`);
    console.log(`${fillItem.blue} - ${fill.description.green}`);
  }
};
