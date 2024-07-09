//Initialing Express as our node framework
const express = require('express');
const app = express();

//Using sequelize as ORM
const sequelize = require('./config/db');

//int Middleware to parse json
app.use(express.json({extended: false}))

//Access Our Environmental Variables
require('dotenv').config();

// Routes Files
const authRoutes = require('./routes/auth')
const organisationsRoutes = require('./routes/organisation')
const usersRoutes = require('./routes/user')

//Import our model 
const User = require('./models/User');
const Organisation = require('./models/Organisation');
const OrganisationUser = require('./models/OrganisationUser')

//Define the relationship that exist between model
// One-to-Many relationship
User.hasMany(Organisation, { foreignKey: 'userId', as: 'organisation' });
Organisation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Many-to-Many relationship
Organisation.belongsToMany(User, { through: OrganisationUser, foreignKey: 'orgId' });
User.belongsToMany(Organisation, { through: OrganisationUser, foreignKey: 'userId' });

//Our server port
const port = process.env.PORT || 6543

//Home page to show server is working
app.get('/', (req, res) => {
    res.send('Hello World')
})

//Mount routers
app.use('/auth', authRoutes);
app.use('/api/organisations',organisationsRoutes);
app.use('/api/users',usersRoutes);

//Routes to handle 404 errors
app.use('*', (req, res, next )=>{
    res.status(404).send('Erorr 404,  Page not Found')
})

// Synchronize models with the database and start the server
sequelize.sync().then(result => {
    //Run our Server on specified port
app.listen(port,()=>{
    //Log to see if server is running
    console.log(`server is running on http://localhost:${port}`)
});
})
    .catch(err =>{ console.log(err)
});

module.exports = app 