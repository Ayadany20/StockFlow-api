
const emailService = require('../services/email.service');

/**
 * ==========================================
 * EMAIL CONTROLLER
 * ==========================================
 * Maneja peticiones HTTP para envío de emails
 */

/**
 * Enviar email genérico
 * POST /api/v1/email/send
 */
const sendEmail = async (req, res, next) => {
    try {
        const { to, subject, text, html } = req.body;

        // Validaciones básicas
        if (!to) {
            return res.status(400).json({
                success: false,
                message: 'El campo "to" (destinatario) es requerido'
            });
        }

        if (!subject) {
            return res.status(400).json({
                success: false,
                message: 'El campo "subject" (asunto) es requerido'
            });
        }

        if (!text && !html) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar "text" o "html" como contenido'
            });
        }

        // Enviar email
        const result = await emailService.sendEmail({ to, subject, text, html });

        res.status(200).json({
            success: true,
            message: 'Email enviado exitosamente',
            data: result
        });
    } catch (error) {
        next(error);
    }
};
/**
 * Verificar conexión del servidor de email
 * GET /api/v1/email/verify
 */
const verifyEmailConnection = async (req, res, next) => {
    try {
        const isConnected = await emailService.verifyConnection();

        if (isConnected) {
            res.status(200).json({
                success: true,
                message: 'Conexión con el servidor de email verificada exitosamente',
                data: {
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    user: process.env.EMAIL_USER,
                    from: process.env.EMAIL_FROM
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error al conectar con el servidor de email. Verifica tu configuración.'
            });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Enviar email de bienvenida
 * POST /api/v1/email/welcome
 */
const sendWelcomeEmail = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Los campos "name" y "email" son requeridos'
            });
        }

        const user = { name, email, role: role || 'user' };
        const result = await emailService.sendWelcomeEmail(user);

        res.status(200).json({
            success: true,
            message: 'Email de bienvenida enviado',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendEmail,
    verifyEmailConnection,
    sendWelcomeEmail,
};
