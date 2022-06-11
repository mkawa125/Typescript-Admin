import { getManager } from 'typeorm';
import { ProductCategory } from '../entities/productCategoryEntity';


export const getAllProductCategories = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductCategory)
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

export const createNewProductCategory = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductCategory);
    const productLabel = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productLabel;
}

export const checkIfProductCategoryExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductCategory);
    const checkProductCategory = await repository.findOne({name: name});

    return checkProductCategory;
}

export const getProductCategoryById = async (id:any) => {
    const repository = getManager().getRepository(ProductCategory)
    const productLabel =  await repository.findOne(id);
    
    return productLabel;
}

export const updateProductCategoryById = async (productLabelId:any, productLabelDetails:any) => {
    const repository = getManager().getRepository(ProductCategory)
    await repository.update(productLabelId, productLabelDetails);
    
    const productLabel = await repository.findOne(productLabelId);
    return productLabel;
}

export const deleteProductCategoryById =async (productLabelId:any) => {
    const repository = getManager().getRepository(ProductCategory);
    await repository.delete(productLabelId);
    return null;
}