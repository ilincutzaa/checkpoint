import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']]
        }
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
    },
    isTwoFactorVerified: {
        type: DataTypes.BOOLEAN
    }
});

export default User;
