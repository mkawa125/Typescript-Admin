import faker from 'faker';
import { Product } from './../entity/productEntity';
import { createConnection, getManager } from "typeorm";
import { randomInt } from 'crypto';

createConnection().then(async  connection => {

    const repository = getManager().getRepository(Product);

    for (let i = 0; i < 30; i++) {

        await repository.save({
            name: faker.lorem.words(2),
            description: faker.lorem.words(20),
            image: faker.image.imageUrl(200, 200, "", true),
            price: 20000
        })
    }

    process.exit(0)

});