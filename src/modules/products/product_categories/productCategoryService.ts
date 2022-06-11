import { getManager } from 'typeorm';
import { ProductCollection } from '../entities/productCollectionEntity';


export const getAllProductCollections = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductCollection)
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

export const createNewProductCollection = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductCollection);
    const productLabel = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productLabel;
}

export const checkIfProductCollectionExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductCollection);
    const checkProductCollection = await repository.findOne({name: name});

    return checkProductCollection;
}

export const getProductCollectionById = async (id:any) => {
    const repository = getManager().getRepository(ProductCollection)
    const productLabel =  await repository.findOne(id);
    
    return productLabel;
}

export const updateProductCollectionById = async (productLabelId:any, productLabelDetails:any) => {
    const repository = getManager().getRepository(ProductCollection)
    await repository.update(productLabelId, productLabelDetails);
    
    const productLabel = await repository.findOne(productLabelId);
    return productLabel;
}

export const deleteProductCollectionById =async (productLabelId:any) => {
    const repository = getManager().getRepository(ProductCollection);
    await repository.delete(productLabelId);
    return null;
}