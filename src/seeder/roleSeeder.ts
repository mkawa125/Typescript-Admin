import { Permission } from './../entity/permissionEntity';
import { getManager } from 'typeorm';
import { createConnection } from 'typeorm';

createConnection().then(async  connection => {

    const permissionRepository = getManager().getRepository(Permission);

    const params = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orsers', 'edit_orders']
    
    for (let i = 0; i < params.length; i++) {
        await permissionRepository.save({
            name: params[i]
        })        
    }

    process.exit(0);
})