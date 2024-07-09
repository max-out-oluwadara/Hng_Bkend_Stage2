const Sequelize = require('sequelize');
const sequelize = require('../config/db');

//Define Our Organisation User model and DataType
const OrganisationUser = sequelize.define('organisation_user', {
    orgId: {
        type: Sequelize.STRING,
        references: {
            model: 'organisations',
            key: 'orgId'
        }
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'userId'
        }
    }
});

module.exports = OrganisationUser;
