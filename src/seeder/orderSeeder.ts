import { OrderItem } from './../entity/orderItemEntity';
import { Order } from './../entity/orderEntity';
import faker from 'faker';
import { createConnection, getManager } from "typeorm";
import { randomInt } from 'crypto';

createConnection().then(async  connection => {

    const orderRepository = getManager().getRepository(Order);
    const orderItemRepository = getManager().getRepository(OrderItem);

    for (let i = 0; i < 30; i++) {

        const order = await orderRepository.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
        });

        for (let j = 0; j < randomNumber(1,5); j++) {
            await orderItemRepository.save({
                order,
                product_title: faker.lorem.words(2),
                price: randomNumber(2000, 40000),
                quantity: randomNumber(1,5)
            })
            
        }
        
    }

    process.exit(0)

});

function randomNumber(min:number, max:number): number { 
    return Math.floor(Math.random() * (max - min) + min);
} 