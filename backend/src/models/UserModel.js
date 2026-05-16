const jwt = require('jsonwebtoken');
const db = require('../config/db');

class UserModel {
    static async create(user) {
        // Mapeando "name" para "username" e "password" para "senha" no banco, conforme seu schema.sql
        const query = 'INSERT INTO Usuarios (username, email, senha, role) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [user.name, user.email, user.password, user.role || 'user']);
        
        return { 
            id: result.insertId, 
            name: user.name, 
            email: user.email, 
            role: user.role || 'user' 
        };
    }

    static async findByEmail(email) {
        // Ajustando as colunas retornadas do SQL (senha as password, username as name) 
        // para manter compatibilidade com o Controller
        const query = 'SELECT id, username as name, email, senha as password, role, reset_token, reset_token_expires FROM Usuarios WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0]; 
    }

    static async findByResetToken(token) {
        const query = 'SELECT id, username as name, email, senha as password, role FROM Usuarios WHERE reset_token = ? AND reset_token_expires > NOW()';
        const [rows] = await db.execute(query, [token]);
        return rows[0];
    }

    static async updateResetToken(userId, token, expires) {
        const query = 'UPDATE Usuarios SET reset_token = ?, reset_token_expires = ? WHERE id = ?';
        await db.execute(query, [token, expires, userId]);
    }

    static async updatePassword(userId, newPassword) {
        const query = 'UPDATE Usuarios SET senha = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?';
        await db.execute(query, [newPassword, userId]);
    }

    static generateToken(user) {
        // Gerando token com a secret key do .env
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role || 'user' }, 
            process.env.JWT_SECRET || 'your_secret_key_change_in_production', 
            { expiresIn: '1h' }
        );
    }
}

module.exports = UserModel;
