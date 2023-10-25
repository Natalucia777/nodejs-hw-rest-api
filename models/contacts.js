const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { FILE } = require("node:dns");
const FILE_PATH = path.join(__dirname, '/models/contacts.json');


const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    res.json(contacts);
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
} };

const getContactById = async (req, res) => {
  try {
    const { id } = res.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const contact = contacts.find((c) => String(c.id) === id);
    res.status(200).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

const addContact = async (req, res) => {
  try {
    const { body } = req;
    const contact = { id: crypto.randomUUID(), ...body };
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    contacts.push(contact);
    await fs.writeFile(FILE_PATH, JSON.stringify(contacts));
    res.status(201).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const removeContact = async (req, res) => {
  try {
      const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const updatedContactsList = contacts.filter(c => c.id !== id);
    
      await fs.writeFile(FILE_PATH, JSON.stringify(updatedContactsList));
      res.status(204).json(contacts);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contact.

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
