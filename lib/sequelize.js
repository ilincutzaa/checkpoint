import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('checkpointdb', 'postgres', 'gogutz', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
