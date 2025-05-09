import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Game = sequelize.define('Game', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "newgame"
    },
    genre: DataTypes.STRING,
    platform: DataTypes.STRING,
    backlogPriority: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    hoursPlayed: {
        type: DataTypes.DECIMAL(7, 1),
        allowNull: false,
        defaultValue: 0,
        index: true
    },
    timesCompleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    completionType: DataTypes.STRING,
    status: DataTypes.STRING,
    dateFirstFinished: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
});

export default Game;
