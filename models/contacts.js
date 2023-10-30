const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
// const { FILE } = require("node:dns");
const FILE_PATH = path.join(__dirname, "/contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    res.json(contacts);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const contact = contacts.find((c) => String(c.id) === String(id));
    res.status(200).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const updatedContactsList = contacts.filter((c) => c.id !== String(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(updatedContactsList, null, 2));
    res.json(updatedContactsList);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addContact = async (req, res) => {
  try {
    const { body } = req;
    const contact = { id: crypto.randomUUID(), ...body };
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    contacts.push(contact);
    await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));
    res.status(201).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const updateContact = async (req, res) => {
  try {
    const { id, ...data } = req.params;
    // const { body } = req;
    // const contact = { ...body };

    const contacts = JSON.parse(await fs.readFile(FILE_PATH));

    const index = contacts.filter((c) => String(c.id) !== String(id));
    if (index === -1) {
      return null;
    }
    const contactIndexData = { ...contacts[index], ...data };
    contacts[index] = { ...contactIndexData, id };

    await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));
    res.status(201).json(contacts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


// const updateContact = async (req, res) => {
//   try {

//     const { id, data } = req.params;
//     const contacts = JSON.parse(await fs.readFile(FILE_PATH));
//     const index = contacts.filter((c) => String(c.id) !== String(id));
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { id, ...data };
//     await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));
//     res.status(201).json(contacts);
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// }; 


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
