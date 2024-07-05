const express = require('express');
const router = express.Router();

const organisationController = require('../controllers/organisationController')

const {createOrganization, 
       getUserOrganisation, 
       addUserToOrganization,
       getOrganizationByIdForUser
      } = organisationController;

//[POST]------/api/organisations
//User can create thier new organisation //201//400
//protected
router.post('/',createOrganization);


//[GET]------/api/organisations
//All organisation user belong to or Created just login user
//Potected
router.get('/',getUserOrganisation);


//[POST]------/api/organisations/:orgId/users
//USer can create their new organisation
//Protected
router.post('/:orgId/users',addUserToOrganization);


//[GET]------/api/users/:id
//Get a single organisation record
//protected
// sucessful 200
router.get('/:orgId',getOrganizationByIdForUser);


module.exports = router;    