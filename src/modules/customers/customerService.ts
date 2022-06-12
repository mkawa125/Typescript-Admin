import  bcryptjs from 'bcryptjs';
import { getManager } from 'typeorm';
import { Customer } from '../../entity/customerEntity';

export const getAllCustomers = async (page:any) => {

    const take = 15;

    const repository = getManager().getRepository(Customer)
    const [customers, total] =  await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });



    return {
        customers: customers.map(customer => {
            const {password, ...customers} = customer;
            return customers;
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    };
}

export const createCustomer = async  (data:any) => {
    
    const {role_id, ...body} = data;
    const hashedPassword = await bcryptjs.hash("1234", 10);
    const repository = getManager().getRepository(Customer);
    const {password, ...customer} = await repository.save({
        ...body, 
        password: hashedPassword,
    });

    return customer;
}

export const getCustomerById = async (id:any) => {
    const repository = getManager().getRepository(Customer)
    const {password, ...customer} =  await repository.findOne(id);
    return customer;
}

export const updateCustomerById = async (customerId:any, customerDetails:any) => {
    const repository = getManager().getRepository(Customer)
    const {role_id, ...body} = customerDetails;
    await repository.update(customerId, {
        ...body

    });
    const {password, ...data} = await repository.findOne(customerId);
    return data;
}

export const deleteCustomerById =async (customerId:any) => {
    const repository = getManager().getRepository(Customer);
    await repository.delete(customerId);
    return null;
}