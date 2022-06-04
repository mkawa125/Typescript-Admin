import { getAllOrders } from './orderService';
import { Request, Response } from "express"
import { Parser } from 'json2csv';
import { getManager } from 'typeorm';
import { Order } from '../../entity/orderEntity';
import { OrderItem } from '../../entity/orderItemEntity';

export const Orders = async (req:Request , res:Response) => {
    
    try {
        const page = parseInt(req.query.page as string || "1")
        const orders = await getAllOrders(page)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Orders retireved successfully",
            orders: orders.data,
            metadata: orders.meta
        })
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const ExportCsv = async (req:Request, res:Response) => {
    try {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });
        const repository = getManager().getRepository(Order);
        const orders =  await repository.find({relations: ['order_items']});
        const json = [];

        orders.forEach((order: Order)  => {
            json.push({
                ID: order.id,
                Name: order.name,
                Email: order.email,
                'Product Title': '',
                Price: '',
                Quantity: '',
            });

            order.order_items.forEach((item: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': item.product_title,
                    Price: item.price,
                    Quantity: item.quantity,
                });
            });
        });

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/json');
        res.attachment('Orders.csv');
        res.send(csv)
        
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

export const Chart =async (req:Request, res:Response) => {
    
    try {
        const manager = getManager();

        const result  = await manager.query(`
            SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum
            FROM  \`orders\` o
            JOIN order_items oi on o.id =  oi.order_id
            GROUP BY date
        `);

        const totalUsers  = await manager.query(`
            SELECT COUNT(id) as total FROM \`user\`
        `);

        const totalOrders  = await manager.query(`
            SELECT COUNT(id) as total_orders FROM \`orders\`
        `);

        const totalProducts  = await manager.query(`
            SELECT COUNT(id) as total_products FROM \`products\`
        `);

        const totalSales  = await manager.query(`
            SELECT SUM(oi.price * oi.quantity) as sum
            FROM  \`orders\` o
            JOIN order_items oi on o.id =  oi.order_id
        `);


        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Orders retireved successfully",
            data: result,
            totalUsers: totalUsers[0]['total'],
            totalOrders: totalOrders[0]['total_orders'],
            totalProducts: totalProducts[0]['total_products'],
            totalSales: totalSales[0]['sum'],
        })

    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
    
}