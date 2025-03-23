const flagService = require('../services/flagService');

exports.getflag = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token no proporcionado o inválido' });
        }
        const token = authHeader.split(' ')[1];
        const result = await flagService.processToken(token);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if(error.status) res.status(error.status).json(error);
        else res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};
