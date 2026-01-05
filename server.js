const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/contact', (req, res) => {
    const { email } = req.body;
    console.log(`Nouveau contact reçu: ${email}`);

    // Ici, vous pourriez intégrer un service d'envoi d'email comme Nodemailer
    // Ou enregistrer l'email dans une base de données (MongoDB, SQLite, etc.)

    res.status(200).json({ message: 'Email reçu avec succès' });
});

app.get('/', (req, res) => {
    res.send('Serveur Backend du Portfolio opérationnel !');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
