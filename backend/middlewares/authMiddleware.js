const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Récupérer le header Authorization
    const authHeader = req.header('Authorization');
    
    // Vérifier si le header Authorization existe
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Remplacer 'Bearer ' par une chaîne vide pour récupérer uniquement le token
    const token = authHeader.replace('Bearer ', '');

    // Si le token est vide ou manquant
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Vérifier le token avec le secret JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attacher les informations utilisateur décodées à la requête
        req.user = decoded;

        // Passer au middleware suivant
        next();
    } catch (err) {
        // En cas d'erreur de vérification du token
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
