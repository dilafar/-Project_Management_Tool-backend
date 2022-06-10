const router = require('express').Router();
let contact = require('../models/contact_model');

//retrieve all
router.route('/').get((req, res) => {
    contact.find()
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error: ' + err));
});

//create
router.route('/add').post((req, res) =>{
    const name = req.body.name;

    const email = req.body.email;

    const comment = req.body.comment;


    const newContact = new contact({

        name,
        email,
        comment,
        Value,

    });

    newContact.save()
        .then(() => res.json('New Enquiry added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//retrieve function 
router.route('/:id').get((req, res) => {
    contact.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete function
router.route('/:id').delete((req, res) => {
    contact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Enquiry deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    contact.findById(req.params.id)
        .then(contact => {
            contact._id = req.body._id;
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.comment = req.body.comment;
        
            contact.save()
                .then(() => res.json('Enquiry details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
