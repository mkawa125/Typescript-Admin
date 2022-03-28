import { Permission } from './../../../entity/permissionEntity';
import { getManager } from 'typeorm';

export const getAllPermissions = async () => {

    const repository = getManager().getRepository(Permission)

    const permissions =  await repository.find();
    
    return permissions;
}