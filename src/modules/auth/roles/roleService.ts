import { Role } from './../../../entity/roleEntity';
import { getManager } from 'typeorm';

export const getAllRoles = async () => {

    const repository = getManager().getRepository(Role)
    const roles =  await repository.find();
    return roles;
}