const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const cvRoutes = require('./routes/cv');
const recommendationRoutes = require('./routes/recommendation');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Connecter à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Route pour l'URL racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du générateur de CV !');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cvs', cvRoutes);
app.use('/api/recommendations', recommendationRoutes);

console.log('MongoDB URI:', process.env.MONGODB_URI);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
