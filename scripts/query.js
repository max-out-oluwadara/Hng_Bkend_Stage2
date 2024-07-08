const db = require('../scripts/query.js');

const fetchUsers = async () => {
    try {
        const result = await db.execute('SELECT * FROM users');
        console.log(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

fetchUsers();


