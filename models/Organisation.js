const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Define Our Organisation model and DataType
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
}, {
    // Disable the automatic timestamps
    timestamps: false
});

module.exports = Organisation;
