const express = require('express');
const app = express();

// Routes Files
const authRoutes = require('./routes/auth')
const organisationsRoutes = require('./routes/organisation')
const usersRoutes = require('./routes/users')

require('dotenv').config();

const port = process.env.PORT || 5000

//Middleware to parse JSON bodies
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

//Mount routers
app.use('/auth', authRoutes);
app.use('/api/organisations',organisationsRoutes)
app.use('/api/users',usersRoutes)

//Routes to handle 404 errors
app.use('*', (req, res, next )=>{
    res.status(404).send('Erorr 404,  Page not Found')
})

//Run our Server
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
});

