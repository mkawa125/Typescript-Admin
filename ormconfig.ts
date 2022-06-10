export = {
        host: process.env.DB_HOST,
        type: process.env.DB_CONNECTION,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            "src/entity/*.ts", "src/modules/products/entities/*.ts"
        ],
        logging: false,
        synchronize: true
}