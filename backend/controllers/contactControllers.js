const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res
    .status(201)
    .json({ message: "Created contact Successfully", data: contact });
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({
    message: "Fetched all the contacts",
    data: contacts,
  });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({
      message: `Contact not found for ${req.params.id}`,
    });
  }
  res.status(200).json({
    message: `Got contact for id ${req.params.id}`,
    data: contact,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({
      message: `Contact not found for ${req.params.id}`,
    });
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `Updated contact for id ${req.params.id}`,
    data: updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404).json({
      message: `Contact not found for ${req.params.id}`,
    });
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete this contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  
  res.status(200).json({
    message: `Deleted contact for id ${req.params.id}`,
    data: contact,
  });
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
