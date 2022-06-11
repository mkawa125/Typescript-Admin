import { getManager } from 'typeorm';
import { ProductAttribute } from '../entities/productAttributeEntity';


export const getAllProductAttributes = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductAttribute)
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

export const createNewProductAttribute = async  (data:any) => {
     
    const repository = getManager().getRepository(ProductAttribute);
    const productAttrubute = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productAttrubute;
}

export const checkIfProductAttributeExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(ProductAttribute);
    const checkProductAttribute = await repository.findOne({title: name});

    return checkProductAttribute;
}

export const getProductAttributeById = async (id:any) => {
    const repository = getManager().getRepository(ProductAttribute)
    const productAttrubute =  await repository.findOne(id);
    
    return productAttrubute;
}

export const updateProductAttributeById = async (attributeId:any, formData:any) => {
    const repository = getManager().getRepository(ProductAttribute)
    await repository.update(attributeId, formData);
    
    const productAttrubute = await repository.findOne(attributeId);
    return productAttrubute;
}

export const deleteProductAttributeById =async (attributeId:any) => {
    const repository = getManager().getRepository(ProductAttribute);
    await repository.delete(attributeId);
    return null;
}