const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('mydatabase', 'bts', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Optional: Disable logging or provide a function for custom logging
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;

