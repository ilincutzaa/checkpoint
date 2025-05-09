import sequelize from '../lib/sequelize.js';
import { Game, Tag } from '../models/index.js';
import { faker } from '@faker-js/faker';

async function seed() {
    await sequelize.sync({ force: true });

    const tagNames = ['RPG', 'Indie', 'Multiplayer', 'Story Rich', 'Retro'];
    const tags = await Promise.all(tagNames.map(name => Tag.create({ name })));

    for (let i = 0; i < 50; i++) {
        const game = await Game.create({
            name: faker.lorem.words(2),
            genre: faker.helpers.arrayElement(['Shooter', 'RPG', 'Strategy']),
            platform: faker.helpers.arrayElement(['PC', 'PS5', 'Switch']),
            backlogPriority: faker.number.int({ min: 1, max: 5 }),
            hoursPlayed: faker.number.float({ min: 0, max: 100 }),
            timesCompleted: faker.number.int({ min: 0, max: 3 }),
            completionType: faker.helpers.arrayElement(['Main Story', '100%', 'Speedrun']),
            status: faker.helpers.arrayElement(['Completed', 'Not Completed']),
            dateFirstFinished: faker.date.past(),
            rating: faker.number.int({ min: 0, max: 5 }),
            description: faker.lorem.sentence(),
        });

        await game.addTags(faker.helpers.shuffle(tags).slice(0, 2));
    }

    console.log('Seeded!');
    await sequelize.close();
}

seed();
