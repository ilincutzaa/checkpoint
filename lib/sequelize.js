// import pg from 'pg';
// import { Sequelize } from 'sequelize';
//
// const sequelize = new Sequelize('checkpointdb', 'postgres', 'gogutz', {
//     host: 'localhost',
//     dialectModule: pg,
//     dialect: 'postgres'
// });
//
// export default sequelize;

import pg from 'pg';
import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('NEON_DATABASE_URL is not set in environment variables');
}

const sequelize = new Sequelize(databaseUrl, {
    dialectModule: pg,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

export default sequelize;

