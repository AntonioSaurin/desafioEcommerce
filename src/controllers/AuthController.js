const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../models/prisma');

class AuthController {
    async login(req, res) {
        try{
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({error: 'email e senha sao obrigatorios'})
            }

            const user = await prisma.user.findUnique({
                where: {email}
            });

            if(!user){
                return res.status(401).json({error: 'credenciais invalidas'});
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash);

            if(!isValidPassword) {
                return res.status(401).json({error: 'credenciais invalidas'})
            }

            const token = jwt.sign({id: user.id},process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_SECRET,
            });

            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            })
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Intern Error'});
        }
    }
}

module.exports = new AuthController();