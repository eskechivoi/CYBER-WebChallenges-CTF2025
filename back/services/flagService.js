const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const { SECRET_KEY } = require('../config');

const FLAG = 'SUGUS{cU!d4D0_c0N_L4s_cL4V3s_S3Cr3T4s}';

exports.validateAdminRole = async (decodedToken) => {
    if (decodedToken.role && decodedToken.role === 'admin') {
        return true;
    }
    return false;
};


exports.processToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const isAdmin = await authService.validateAdminRole(decoded);
        if (isAdmin) {
            return { flag: FLAG };
        } else {
            throw { status: 401, message: 'Unauthorized' };
        }
    } catch (error) {
        console.error(error);
        throw error.status ? error : { status: 500, message: 'Error al procesar el token' };
    }
};
