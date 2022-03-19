import  bcryptjs from 'bcryptjs';
import { getManager } from 'typeorm';
import { User } from './../../entity/user.entity';

export const getAllUsers = async () => {

    const repository = getManager().getRepository(User)
    const users =  await repository.find();
    return users.map(user => {
        const {password, ...data} = user;
        return data
    });
}

export const createUser = async  (data:any) => {
    
    const {role_id, ...body} = data;
    const hashedPassword = await bcryptjs.hash("1234", 10);
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.save({
        ...body, 
        password: hashedPassword
    });

    return user;
}

export const getUserById = async (id:any) => {
    const repository = getManager().getRepository(User)
    const {password, ...user} =  await repository.findOne(id);
    return user;
}

export const updateUserById = async (userId:any, userDetails:any) => {
    const repository = getManager().getRepository(User)
    const {role_id, ...body} = userDetails;
    await repository.update(userId, {
        ...body,

    });
    const {password, ...data} = await repository.findOne(userId);
    return data;
}

export const deleteUserById =async (userId:any) => {
    const repository = getManager().getRepository(User);
    await repository.delete(userId);
    return null;
}