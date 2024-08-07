const Sequelize = require('sequelize');
const sequelize = require('../src/database');

// Define Our Organisation User model and DataType
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
}, {
    // Disable the automatic timestamps
    timestamps: false
});

module.exports = OrganisationUser;
