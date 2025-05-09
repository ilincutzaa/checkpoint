import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
});

export default Tag;
