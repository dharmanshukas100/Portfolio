const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:8000', // Adjust this if necessary
    methods: 'POST',
    allowedHeaders: 'Content-Type',
  };
  app.use(cors(corsOptions));


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use('/html', express.static('E:/Webpage/portfolio 3'));

// Form submission endpoint
app.post('/submit-form', (req, res) => {
    const { email, query } = req.body;
    const data = `Email: ${email}\nQuery: ${query}\n\n`;

    fs.appendFile('form-data.txt', data, (err) => {
        if (err) {
            console.error('Failed to save data:', err);
            return res.status(500).send('Failed to save data');
        }
        res.send('Form submitted successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
