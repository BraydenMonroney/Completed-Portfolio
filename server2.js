const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); 
const cors = require('cors');
const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: 'Braydenfb33!',  
    database: 'contact_form_db' 
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});
//wasn't working without this I don't know why

app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comments = req.body.comments;

    const sql = 'INSERT INTO contactform (name, email, comments) VALUES (?, ?, ?)';
    db.query(sql, [name, email, comments], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('An error occurred while processing your request. Please try again later.');
        }
        console.log('Data inserted into the database');
        res.send('Thank you for your comments! click link to get back <a href="http://localhost:3000/">Get Back</a>');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html')); 
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html')); 
});
