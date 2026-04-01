const prisma = require('../models/prisma');

class ProductController{
    async index(req, res){
        try{
            const products = await prisma.product.findMany({
                where: {
                    active: true
                }
            });
            return res.json(products);
        }catch{
            return res.status(500).json({error: 'Falha ao buscar produtos!'});
        }
    }

    async show(req, res){
        try {
            const {id} = req.params;

            const product = await prisma.product.findFirst({
                where:{
                    id,
                    active: true
                }
            })

            if(!product){
                return res.status(404).json({error: 'Produto nao encontrado'})
            }

            return res.json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Erro ao procurar produto'});
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

    async update(req, res){
        try{
            const {id} = req.params;
            const {name, description, price, stock, category} = req.body;
            
            const productExists = await prisma.product.findUnique({
                where: {
                    id,
                    active: true
                }

            });

            if(!productExists){
                return res.status(404).json({error: 'Produto nao encontrado'});
            }

            const product = await prisma.product.update({
                where: {id},
                data: {
                    name,
                    description,
                    price: price ? parseFloat(price) : undefined,
                    stock: stock !== undefined ?parseInt(stock) : undefined,
                    category
                }
            });

            return res.json(product);
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Erro ao atualizar produto'})
        }
    }

    async delete(req, res){
        try {
            const {id} = req.params;

            const productExists = await prisma.product.findUnique({
                where: {id},
            })

            if(!productExists){
                return res.status(404).json({error: 'Produto nao encontrado'});
            }

            await prisma.product.update({
                where: {id},
                data:{
                    active: false,
                }
            });

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Erro ao deletar produto'});
        }
    }
}

module.exports = new ProductController();