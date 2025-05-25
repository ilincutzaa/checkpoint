import sequelize from '../lib/sequelize.js';
import User from '../models/User.js';

export default async function usersSeed() {
    await sequelize.sync({ force: true });

    await User.create({
        username: "test",
        password: "test",
        role: "user",
    })

    console.log('Seeded!');
    await sequelize.close();
}

usersSeed();
