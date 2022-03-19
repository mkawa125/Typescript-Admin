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