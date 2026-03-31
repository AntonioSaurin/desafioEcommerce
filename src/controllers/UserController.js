const bcrypt = require('bcrypt');
const prisma = require('../models/prisma');

class UserController {
    async create(req, res) {
        try{
            const {name, email, password} = req.body;

            if(!name || !email || !password){
                return res.status(400).json({error: 'Nome, email e senha são obrigatoris'});
            }

            const userExist = await prisma.user.findUnique({where: {email}});

            if(userExist) {
                return res.status(400).json({error: 'Email já utilizado'});
            }

            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password_hash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true
                }
            });
            return res.status(201).json(user);
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Intern error'});
        }
    }
}

module.exports = new UserController();