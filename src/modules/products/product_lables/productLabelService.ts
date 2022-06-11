import { getManager } from 'typeorm';
import { ProductLabel } from '../entities/productLabelEntity';


export const getAllProductLabels = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductLabel)
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

export const createNewProductLabel = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductLabel);
    const productLabel = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productLabel;
}

export const checkIfProductLabelExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductLabel);
    const checkProductLabel = await repository.findOne({name: name});

    return checkProductLabel;
}

export const getProductLabelById = async (id:any) => {
    const repository = getManager().getRepository(ProductLabel)
    const productLabel =  await repository.findOne(id);
    
    return productLabel;
}

export const updateProductLabelById = async (productLabelId:any, productLabelDetails:any) => {
    const repository = getManager().getRepository(ProductLabel)
    await repository.update(productLabelId, productLabelDetails);
    
    const productLabel = await repository.findOne(productLabelId);
    return productLabel;
}

export const deleteProductLabelById =async (productLabelId:any) => {
    const repository = getManager().getRepository(ProductLabel);
    await repository.delete(productLabelId);
    return null;
}