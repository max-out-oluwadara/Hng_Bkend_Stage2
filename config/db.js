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
// const { Client } = require('pg');

// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'mydatabase',
//     password: ''
// });

// const connectDb = () => {
//     return new Promise((resolve, reject) => {
//         client.connect((err) => {
//             if (err) {
//                 console.error('db connection error', err.stack);
//                 reject(err);
//             } else {
//                 console.log('db connected');
//                 resolve(client);
//             }
//         });
//     });
// };

// const getClient = async () => {
//     if(!client._connected) {
//         await connectDb();
//     }
//     return client;
// }

// module.exports = getClient;
