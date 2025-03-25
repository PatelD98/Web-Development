const express = require('express');
const router = express.Router();
const { 
    getContacts, 
    createContact, 
    getContactById, 
    updateContact, 
    deleteContact, 
    searchContacts, 
    searchContactsByName, 
    searchContactsByEmail, 
    searchContactsByPhone, 
    searchContactsByAddress 
} = require('../controllers/contactController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.use(validateTokenHandler);

router.route('/')
    .get(getContacts)
    .post(createContact);

router.route('/:id')
    .get(getContactById)
    .put(updateContact)
    .delete(deleteContact);

router.route('/search')
    .get(searchContacts);

router.route('/search/:name')
    .get(searchContactsByName);

router.route('/search/:email')
    .get(searchContactsByEmail); 

router.route('/search/:phone')
    .get(searchContactsByPhone);

router.route('/search/:address')
    .get(searchContactsByAddress);

module.exports = router;