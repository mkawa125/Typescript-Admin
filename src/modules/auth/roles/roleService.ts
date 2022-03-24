import { Role } from './../../../entity/roleEntity';
import { getManager } from 'typeorm';

export const getAllRoles = async () => {

    const repository = getManager().getRepository(Role)
    const roles =  await repository.find();
    return roles;
}

export const createNewRole = async (userDetails:any) => {
    
    const {name, permissions} = userDetails
    const repository = getManager().getRepository(Role)
    const role = await repository.save({
        name, 
        permissions: permissions.map(id => ({id}))
    }); 
    
    return role;

}

export const getRoleById = async (roleId:any) => {
    const repository = getManager().getRepository(Role)
    const role =  await repository.findOne(roleId, {
        relations: ['permissions']
    });
    return role;
}

export const updateRoleById =async (roleId:any, userDetails:any) => {
    const repository = getManager().getRepository(Role)
    const {name, permissions} = userDetails;
    const role = await repository.save({
        id: parseInt(roleId),
        name,
        permissions: permissions.map(id => ({id}))

    });
    
    return role;
}