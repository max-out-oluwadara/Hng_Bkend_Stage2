const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const organisationController = require('../controllers/organisationController')

const { 
        createOrganization, 
        getMyOrganisations, 
        addUserToOrganization,
        getOrganisationById
      } = organisationController;

//@route Post /api/organisations
//@desc  User can create their new organisation
//@Protected
router.post('/', auth , createOrganization);

//@route get /api/organisations
//@desc  get all organisation a user belong to or Created
//@Protected
router.get('/', auth, getMyOrganisations);

//@route post /api/organisations/:orgId/users
//@desc  Add a user to a particular organisation
//@Protected
router.post('/:orgId/users', auth, addUserToOrganization);

//@route get /api/organisations/:orgId
//@desc  Get a single organisation record
//@Protected
router.get('/:orgId', auth, getOrganisationById);


module.exports = router;    