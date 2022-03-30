import { Order } from './../../entity/orderEntity';
import { getManager } from 'typeorm';

export const getAllOrders = async (page:any) => {

    const take = 15;

    const repository = getManager().getRepository(Order)
    const [data, total] =  await repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ["order_items"]
    });

    
    return {
        data: data.map((order: Order) => ({
            id: order.id,
            name: order.name,
            email: order.email,
            total: order.total,
            created_at: order.created_at,
            order_items: order.order_items

        })),
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    };
}