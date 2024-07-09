const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Define Our User model and DataType
const User = sequelize.define('user', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
    }
}, {
    // Disable the automatic timestamps
    timestamps: false
});

module.exports = User;
