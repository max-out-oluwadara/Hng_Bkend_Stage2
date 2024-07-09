const { Sequelize } = require('sequelize');
// const createClient = require('@supabase/supabase-js')
require('dotenv').config();

// Create a new Sequelize instance
// const sequelize = new Sequelize(process.env.SUPA_NAME,process.env.SUPA_PASSWORD, process.env.SUPA_SECRET, {
//     host: 'huwlqbxowrhlybewfgou.supabase.co',
//     dialect: 'postgres'
    
// });


// const sequelize = new Sequelize('mydatabase', 'bts', '', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false, // Optional: Disable logging or provide a function for custom logging
// });

// // Test the connection
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to PostgreSQL has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

// module.exports = sequelize;



// const sequelize = new Sequelize('mydatabase', 'bts', '', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false, // Optional: Disable logging or provide a function for custom logging
// });














// const { Sequelize } = require('sequelize');
// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();

// // Supabase configuration
// const supabaseUrl = 'https://huwlqbxowrhlybewfgou.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Sequelize configuration
// const sequelize = new Sequelize(
//   process.env.SUPA_NAME, 
//   process.env.SUPA_USER, 
//   process.env.SUPA_PASSWORD, 
//   {
//     host: process.env.SUPA_HOST,
//     dialect: process.env.SUPA_DIALECT,
//     logging: false, // Optional: Disable logging or provide a function for custom logging
//   }
// );

// // Test the connection
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to PostgreSQL has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

// module.exports = {
//   sequelize,
//   supabase
// };



















// Create a new Sequelize instance
// const sequelize = new Sequelize(process.env.SUPA_NAME,process.env.SUPA_PASSWORD, process.env.SUPA_SECRET, {
//     host: 'huwlqbxowrhlybewfgou.supabase.co',
//     dialect: 'postgres'
    
// });


const sequelize = new Sequelize('postgres', 'postgres.huwlqbxowrhlybewfgou', 'Oluwadara123', {
    host: 'aws-0-us-west-1.pooler.supabase.com',
    dialect: 'postgres',
    logging: false, // Optional: Disable logging or provide a function for custom logging
});

// // Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;