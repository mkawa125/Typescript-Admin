import { getManager } from 'typeorm';
import { Product } from '../../entity/productEntity';

export const getAllProducts = async () => {

    const repository = getManager().getRepository(Product)
    const products =  await repository.find();
    return products;
}

export const createNewProduct = async  (data:any) => {
    
    const repository = getManager().getRepository(Product);
    const product = await repository.save(data);

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