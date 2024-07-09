const Organisation  = require('../models/Organisation');
const OrganisationUser = require('../models/OrganisationUser')
const  User  = require('../models/User');
const { v4: uuidv4 } = require('uuid');

//GET
//All the orginisation the user belongs to or created
//Dont get another user orginisation
exports.getMyOrganisations = async (req, res) => {
    try {
       
        const userId = await req.user && req.user.userId;
        console.log('User ID:', userId);

        if (!userId) {
            console.log('No user ID found in request');
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized'
            });
        }

        const organisations = await Organisation.findAll({
            where: { userId }
        });
        console.log('Organisations:', organisations);

        if (organisations.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No organisations found for this user'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Organisations retrieved successfully',
            data: 
                {
                    organisations: organisations.map(org => ({
                    orgId: org.orgId,
                    name: org.name,
                    description: org.description
                }))
            }
        });
    } catch (err) {
        console.error('Error fetching organisations for user', err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};
    

//GET
//The log in user gets a single Organisation record
exports.getOrganisationById = async (req, res)=>{
    try {
        const orgId = req.params.orgId;
        const userId = req.user.userId; // Retreving userId from middlware

        if (!userId) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized'
            });
        }

        const organisation = await Organisation.findOne({
            where: { orgId, userId }
        });

        if (!organisation) {
            return res.status(404).json({
                status: 'fail',
                message: 'Organisation not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Organisation retrieved successfully',
            data: {
                    organisation: {
                    orgId: organisation.orgId,
                    name: organisation.name,
                    description: organisation.description
                }
            }
        });
    } catch (err) {
        console.error('Error fetching organisation', err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }

};


//POST
//User can Create their new organisation
exports.createOrganization = async (req, res)=>{
    try {
        const userId = req.user.userId; // Retreving userId from middlware
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Name is required'
            });
        }

        const newOrganisation = await Organisation.create({
            orgId: uuidv4(), //Generating ID
            name,
            description,
            userId
        });

        res.status(201).json({
            status: 'success',
            message: 'Organisation created successfully',
            data: {
                organisation: 
                    {
                        orgId: newOrganisation.orgId,
                        name: newOrganisation.name,
                        description: newOrganisation.description
                    }
            }
        });
    } catch (err) {
        console.error('Error creating organisation', err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
}

//POST
//Add a user to a particular Organisation
exports.addUserToOrganization = async (req, res) => {

    try {
        const orgId = req.params.orgId;
        const { userId } = req.body;

        // Find the organization
        const organisation = await Organisation.findOne({ where: { orgId } });

        if (!organisation) {
            return res.status(404).json({
                status: 'fail',
                message: 'Organisation not found'
            });
        }

        // Find the user
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // Check if the user is already part of the organization
        const existingEntry = await OrganisationUser.findOne({
            where: { orgId, userId }
        });

        if (existingEntry) {
            return res.status(400).json({
                status: 'fail',
                message: 'User is already part of the organisation'
            });
        }

        // Add user to the organization
        await OrganisationUser.create({ orgId, userId });

        res.status(201).json({
            status: 'success',
            message: 'User added to organisation successfully'
        });
    } catch (err) {
        console.error('Error adding user to organisation', err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};