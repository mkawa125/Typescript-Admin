import { Order } from './../../entity/orderEntity';
import { getManager } from 'typeorm';

export const getAllOrders = async (page:any) => {

    const take = 15;

    const repository = getManager().getRepository(Order)
    const [data, total] =  await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });

    
    return {
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    };
}