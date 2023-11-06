const fs = require("fs/promises");
const path = require("path");

const FILE_PATH = path.join(__dirname, "/contacts.json");
const crypto = require("node:crypto");

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

const updateContact = async (id, data) => {
  // const contacts = await listContacts();
  const contacts = JSON.parse(await fs.readFile(FILE_PATH));
  const index = contacts.findIndex(({ id: contactId }) => contactId === String(id));
  if (index === -1) {
    return null;
  }

  const contact = { ...contacts[index], ...data };
  contacts[index] = { ...contact, id };
  await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
