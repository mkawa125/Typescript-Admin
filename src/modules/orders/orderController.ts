import { getAllOrders } from './orderService';
import { Request, Response } from "express"

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