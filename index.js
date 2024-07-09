const express = require('express');
const app = express();


const sequelize = require('./config/db');

//int Middleware
app.use(express.json({extended: false}))

// Routes Files
const authRoutes = require('./routes/auth')
const organisationsRoutes = require('./routes/organisation')
const usersRoutes = require('./routes/user')

require('dotenv').config();

//Import our model to define relationshiop
const User = require('./models/User');
const Organisation = require('./models/Organisation');
const OrganisationUser = require('./models/OrganisationUser')


const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World')
})

//Mount routers
app.use('/auth', authRoutes);
app.use('/api/organisations',organisationsRoutes);
app.use('/api/users',usersRoutes);


//Define the relationship that exist between model
// One-to-Many relationship
User.hasMany(Organisation, { foreignKey: 'userId', as: 'organisation' });
Organisation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Many-to-Many relationship
Organisation.belongsToMany(User, { through: OrganisationUser, foreignKey: 'orgId' });
User.belongsToMany(Organisation, { through: OrganisationUser, foreignKey: 'userId' });

//Routes to handle 404 errors
app.use('*', (req, res, next )=>{
    res.status(404).send('Erorr 404,  Page not Found')
})



sequelize.sync().then(result => {

    //Run our Server
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
});
})
.catch(err =>{
    console.log(err)
});

