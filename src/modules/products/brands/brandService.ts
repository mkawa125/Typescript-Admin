import { getManager } from 'typeorm';
import { Brand } from '../entities/brandEntity';
import { brandValidation } from './brandValidation';


export const getAllBrands = async (page:any) => {

    const take = 10;

    const repository = getManager().getRepository(Brand)
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

export const createNewBrand = async  (data:any) => {
     
    const repository = getManager().getRepository(Brand);
    const brand = await repository.save({
        ...data,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    });

    return brand;
}

export const checkIfBrandExistByName = async (name:string) => {
     
    const repository = getManager().getRepository(Brand);
    const checkBrand = await repository.findOne({name: name});

    return checkBrand;
}

export const getBrandById = async (id:any) => {
    const repository = getManager().getRepository(Brand)
    const brand =  await repository.findOne(id);
    
    return brand;
}

export const updateBrandById = async (brandId:any, brandDetails:any) => {
    const repository = getManager().getRepository(Brand)
    await repository.update(brandId, brandDetails);
    
    const brand = await repository.findOne(brandId);
    return brand;
}

export const deleteBrandById =async (brandId:any) => {
    const repository = getManager().getRepository(Brand);
    await repository.delete(brandId);
    return null;
}