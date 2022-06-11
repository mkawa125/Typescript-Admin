import { getManager } from 'typeorm';
import { ProductTag } from '../entities/productTagEntity';


export const getAllProductTags = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductTag)
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

export const createNewProductTag = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductTag);
    const productLabel = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productLabel;
}

export const checkIfProductTagExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductTag);
    const checkProductTag = await repository.findOne({name: name});

    return checkProductTag;
}

export const getProductTagById = async (id:any) => {
    const repository = getManager().getRepository(ProductTag)
    const productLabel =  await repository.findOne(id);
    
    return productLabel;
}

export const updateProductTagById = async (productLabelId:any, productLabelDetails:any) => {
    const repository = getManager().getRepository(ProductTag)
    await repository.update(productLabelId, productLabelDetails);
    
    const productLabel = await repository.findOne(productLabelId);
    return productLabel;
}

export const deleteProductTagById =async (productLabelId:any) => {
    const repository = getManager().getRepository(ProductTag);
    await repository.delete(productLabelId);
    return null;
}