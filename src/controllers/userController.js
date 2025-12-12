// src/controllers/userController.js
import db from '../models/index.js';
const { User } = db;
import bcrypt from 'bcryptjs';
import { sendEmail } from '../services/email.service.js';

export default {
    // Obtener todos los usuarios
    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener usuario por ID
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear usuario + enviar correo de bienvenida
    async create(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario en la base de datos
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            // Enviar correo de bienvenida
            try {
                await sendEmail(
                    newUser.email,
                    'Bienvenido a StockFlow',
                    `<h1>Hola ${newUser.name}!</h1>
                     <p>Gracias por registrarte en StockFlow. Ahora puedes iniciar sesión y comenzar a usar la aplicación.</p>`
                );
            } catch (err) {
                console.error('Error al enviar correo de bienvenida:', err.message);
            }

            res.status(201).json({
                message: "Usuario creado",
                data: newUser
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar usuario
    async update(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

            // Actualizar campos
            if (password) user.password = await bcrypt.hash(password, 10);
            user.name = name ?? user.name;
            user.email = email ?? user.email;
            user.role = role ?? user.role;

            await user.save();

            res.json({ message: "Usuario actualizado", data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar usuario
    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

            await user.destroy();
            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
