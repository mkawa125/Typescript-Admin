import { getManager } from 'typeorm';
import { ProductAttributeSet } from '../entities/productAttributeSetEntity';


export const getAllProductAttributeSets = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductAttributeSet)
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

export const createNewProductAttributeSet = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductAttributeSet);
    const productAttributeSet = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productAttributeSet;
}

export const checkIfProductAttributeSetExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductAttributeSet);
    const checkProductAttributeSet = await repository.findOne({title: name});

    return checkProductAttributeSet;
}

export const getProductAttributeSetById = async (id:any) => {
    const repository = getManager().getRepository(ProductAttributeSet)
    const productAttributeSet =  await repository.findOne(id);
    
    return productAttributeSet;
}

export const updateProductAttributeSetById = async (Id:any, FormData:any) => {
    const repository = getManager().getRepository(ProductAttributeSet)
    await repository.update(Id, FormData);
    
    const productAttributeSet = await repository.findOne(Id);
    return productAttributeSet;
}

export const deleteProductAttributeSetById =async (Id:any) => {
    const repository = getManager().getRepository(ProductAttributeSet);
    await repository.delete(Id);
    return null;
}