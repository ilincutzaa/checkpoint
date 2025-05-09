import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    platform: DataTypes.STRING,
    backlogPriority: DataTypes.INTEGER,
    hoursPlayed: DataTypes.FLOAT,
    timesCompleted: DataTypes.INTEGER,
    completionType: DataTypes.STRING,
    status: DataTypes.STRING,
    dateFirstFinished: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
});

export default Game;
