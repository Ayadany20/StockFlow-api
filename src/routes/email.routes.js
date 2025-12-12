
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

/**
 * ==========================================
 * EMAIL ROUTES
 * ==========================================
 * Rutas para gestión de envío de emails
 */

/**
 * @route   GET /api/email/verify
 * @desc    Verificar conexión con el servidor de email
 * @access  Private (Admin)
 */
router.get('/verify', verifyToken, checkRole('admin'), emailController.verifyEmailConnection);

/**
 * @route   POST /api/email/send
 * @desc    Enviar email genérico
 * @access  Private (Admin, Organizer)
 * @body    { to, subject, text, html }
 */
router.post('/send', verifyToken, checkRole('admin', 'organizer'), emailController.sendEmail);

/**
 * @route   POST /api/email/welcome
 * @desc    Enviar email de bienvenida
 * @access  Private (Admin)
 * @body    { name, email, role }
 */
router.post('/welcome', verifyToken, checkRole('admin'), emailController.sendWelcomeEmail);

module.exports = router;
