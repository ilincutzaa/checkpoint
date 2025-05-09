import pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('checkpointdb', 'postgres', 'gogutz', {
    host: 'localhost',
    dialectModule: pg,
    dialect: 'postgres'
});

export default sequelize;
