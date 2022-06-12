import { getManager } from 'typeorm';
import { ProductAttribute } from '../entities/productAttributeEntity';


export const getAllProductAttributes = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(ProductAttribute)
    const [data, total] =  await repository.findAndCount({
        relations: ['attribute_set'],
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
     
    const {product_attribute_set_id, ...body} = data;
    const repository = getManager().getRepository(ProductAttribute);
    const productAttrubute = await repository.save({
        ...body,
        attribute_set: {
            id: product_attribute_set_id
        },
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return productAttrubute;
}

export const checkIfProductAttributeExistByName = async (title:string) => {
     
    const repository = getManager().getRepository(ProductAttribute);
    const checkProductAttribute = await repository.findOne({title: title});

    return checkProductAttribute;
}

export const getProductAttributeById = async (id:any) => {
    const repository = getManager().getRepository(ProductAttribute)
    const productAttrubute =  await repository.findOne(id);
    
    return productAttrubute;
}

export const updateProductAttributeById = async (attributeId:any, formData:any) => {
    
    const {product_attribute_set_id, ...body} = formData;
    const repository = getManager().getRepository(ProductAttribute)
    await repository.update(attributeId, {
        ...body,
        attribute_set: {
            id: product_attribute_set_id
        },

    });
    
    const productAttrubute = await repository.findOne(attributeId);
    return productAttrubute;
}

export const deleteProductAttributeById =async (attributeId:any) => {
    const repository = getManager().getRepository(ProductAttribute);
    await repository.delete(attributeId);
    return null;
}