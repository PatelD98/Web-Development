const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
    //res.status(200).json({ message: "Get all contacts" });
});

//@desc Create New contacts
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone || !address) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const contact = await Contact.create({ 
        name, 
        email, 
        phone, 
        address,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access Private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate
    (req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedContact);
   //res.status(200).json({ message: "Update contact with id " + req.params.id });
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove
    res.status(200).json({ message: "Deleted contact with id " + req.params.id });
});

//@desc Search contacts
//@route GET /api/contacts/search
//@access Public
const searchContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Search contacts" });
});

//@desc Search contacts by name
//@route GET /api/contacts/search/:name
//@access Public
const searchContactsByName = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Search contacts by name " + req.params.name });
});

//@desc Search contacts by email
//@route GET /api/contacts/search/:email
//@access Public
const searchContactsByEmail = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Search contacts by email " + req.params.email });
});

//@desc Search contacts by phone
//@route GET /api/contacts/search/:phone
//@access Public
const searchContactsByPhone = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Search contacts by phone " + req.params.phone });
});

//@desc Search contacts by address
//@route GET /api/contacts/search/:address
//@access Public
const searchContactsByAddress = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Search contacts by address " + req.params.address });
});

module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
    searchContacts,
    searchContactsByName,
    searchContactsByEmail,
    searchContactsByPhone,
    searchContactsByAddress,
};
