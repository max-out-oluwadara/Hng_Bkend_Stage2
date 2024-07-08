const express = require('express');
const router = express.Router();

const organisationController = require('../controllers/organisationController')

const { 
        createOrganization, 
        getUserOrganisation, 
        addUserToOrganization,
        getOrganizationByIdForUser
      } = organisationController;

//@route Post /api/organisations
//@desc  User can create their new organisation
//@Protected
router.post('/',createOrganization);

//@route get /api/organisations
//@desc  get all organisation a user belong to or Created
//@Protected
router.get('/',getUserOrganisation);

//@route post /api/organisations/:orgId/users
//@desc  Add a user to a particular organisation
//@Protected
router.post('/:orgId/users',addUserToOrganization);

//@route get /api/organisations/:orgId
//@desc  Get a single organisation record
//@Protected
router.get('/:orgId',getOrganizationByIdForUser);


module.exports = router;    