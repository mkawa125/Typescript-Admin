### Typescript Admin Skeleton

### Background

This is the complete Typescript admin skeleton for any new project. It is written in typecript and more features are added so that this skeleton can be more compact and more secure.
___

### Features
- [x] User authentication. User login, register, logout, session management, JWT
- [x] User management. Create user, edit, update, delete, manager user profile
- [x] Roles and permissions and protecting resources according to user permissions
- [x] Using middlewares
- [x] Environmental variables
- [x] Database seeders
- [x] Products management. Create, delete, update, view, seed.
- [x] Orders and order items management. Create order, view orders, update and delete
- [x] Pagination
- [x] Uploading images
- [x] Raw queries
- [x] Permission middlewares
- [x] Export CSV
___

### Technologies

- Express
- Typescript
- TypeORM
- SQL
___

### Typescript configurations

1. **Create package.json file**
    - `npm npm init -y `
    - `npm i -D typescript ts-node nodemon`
    - `sudo npm i -g typescript This command installs typescript dependencies globally`
    - `tsc --init  This create typescript configuration file`

### Configure the configurations file
1. **package.json**
```
   {
    "name": "node-admin",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "nodemon src/index.ts"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "nodemon": "^2.0.15",
        "ts-node": "^10.7.0",
        "typescript": "^4.6.2"
    }
   }
   
```
2. **tsconfig.json**
```
{
  "compilerOptions": {
    
    "target": "es2016",                  
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
}
```
3. **nodemon.json**
```
{
    "ignore": [
        ".git",
        "node_modules/",
        "dist/",
        "coverage/"
    ],
    "watch": [
        "src/*"
    ],
    "ext": "js, json, ts"
}
```

### Supervisor configuration
https://medium.com/@saif.ullah/ubuntu-setup-for-nodejs-app-to-run-forever-using-supervisor-on-nginx-eba411940832
