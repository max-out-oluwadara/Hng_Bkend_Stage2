
const Sequelize = require('sequelize')

const sequelize = require('../config/db');

const Organisation = sequelize.define('organisation', {
    orgId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Organisation;