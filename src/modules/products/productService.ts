import { getManager } from 'typeorm';
import { Product } from '../../entity/productEntity';

export const getAllProducts = async (page:any) => {

    const take = 6;

    const repository = getManager().getRepository(Product)
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

export const createNewProduct = async  (data:any) => {
    
    const repository = getManager().getRepository(Product);
    const product = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return product;
}

export const getProductById = async (id:any) => {
    const repository = getManager().getRepository(Product)
    const product =  await repository.findOne(id);
    
    return product;
}

export const updateProductById = async (productId:any, userDetails:any) => {
    const repository = getManager().getRepository(Product)
    await repository.update(productId, userDetails);
    
    const product = await repository.findOne(productId);
    return product;
}

export const deleteProductById =async (productId:any) => {
    const repository = getManager().getRepository(Product);
    await repository.delete(productId);
    return null;
}