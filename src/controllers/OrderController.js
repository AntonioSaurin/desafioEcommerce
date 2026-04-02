const prisma = require('../models/prisma');

class OrderController{
    async create(req, res){
        try{
            const {items}=req.body;
            const user_id = req.userID;

            if(!items || !Array.isArray(items) || items.length === 0){
                return res.status(400).json({erro: 'Adicione plo menos um item'})
            }

            let total = 0;
            const orderItemsData = [];

            for (const item of items) {
                const product = await prisma.product.findFirst({
                    where: {
                        id: item.product_id,
                        active: true
                    }
                });

                if(!product) {
                    return res.status(404).json({error: 'produto nao encontrado'});
                }

                console.log(`Verificando Produto: ${product.name} | Estoque no BD: ${product.stock} (${typeof product.stock}) | Quantidade Pedida: ${item.quantity} (${typeof item.quantity})`);

                if(product.stock<item.quantity){
                    return res.status(400).json({error: `Estoque insuficiente. ${product.name}`});
                }

                total += parseFloat(product.price)*item.quantity;

                orderItemsData.push({
                    product_id: product.id,
                    quantity: item.quantity,
                    unit_price: product.price
                });
            }

            const order = await prisma.$transaction(async (transaction) => {
                const newOrder = await transaction.order.create({
                    data: {
                        user_id,
                        total,
                        items: {
                            create: orderItemsData
                        } 
                    },
                    include: {
                        items: true
                    }
                });

                for (const item of items) {
                    await transaction.product.update({
                        where: {id: item.product_id},
                        data: {
                            stock: {
                                decrement: item.quantity
                            }
                        }
                    });
                }
                return newOrder;
            });

            return res.status(201).json(order);
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Internal error.'})
        }
    }

    async index(req, res){
        try{
            const user_id = req.userID;

            const orders = await prisma.order.findMany({
                where: {user_id},
                include: {
                    items: {
                        include: {
                            product: {
                                select: {name: true, price: true}
                            }
                        }
                    }
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            
            return res.json(orders);
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Erro ao listar pedidos'});
        }
    }
}

module.exports = new OrderController;