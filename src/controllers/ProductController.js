const prisma = require('../models/prisma');

class ProductController{
    async index(req, res){
        try{
            const products = await prisma.product.findMany();
            return res.json(products);
        }catch{
            return res.status(500).json({error: 'Falha ao buscar produtos!'});
        }
    }

    async create(req, res){
        try{
            const {name, description, price, stock, category} = req.body;

            if(!name || !description || !price || stock===undefined ||!category){
                return res.status(400).json({error: 'Um ou mais campos nao informados'});
            }

            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    category
                }
            });

            return res.status(201).json(product);
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Erro ao criar produto'});
        }
    }
}

module.exports = new ProductController();