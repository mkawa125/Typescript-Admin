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

export const createUser =async  (data) => {
    
    const {role_id, ...body} = data;
    const hashedPassword = await bcryptjs.hash("1234", 10);
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.save({
        ...body, 
        password: hashedPassword
    });

    return user;
}