const { program } = require("commander");
const contacts = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(`All contacts: `, allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(`Contact: `, contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(`New contact: `, newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(`Delete contact: `, deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
