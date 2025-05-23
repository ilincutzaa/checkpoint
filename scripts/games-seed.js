import sequelize from '../lib/sequelize.js';
import { Game, Tag } from '../models/index.js';
import { faker } from '@faker-js/faker';

async function gamesSeed() {
    await sequelize.sync({ force: true });

    const tagNames = [
        "Multiplayer",
        "Story-Rich",
        "Open World",
        "Retro",
        "Indie",
        "Survival",
        "First-Person",
        "Third-Person",
        "Pixel Art",
        "Roguelike",
        "Turn-Based",
        "Fast-Paced",
        "Horror",
        "Relaxing",
        "Platformer",
        "Puzzle",
        "Tactical",
        "Real-Time",
        "Co-op",
        "Singleplayer"
    ];

    const tags = await Promise.all(tagNames.map(name => Tag.create({ name })));

    for (let i = 0; i < 10; i++) {
        const game = await Game.create({
            name: faker.lorem.words(2),
            genre: faker.helpers.arrayElement([
                "Action",
                "Adventure",
                "RPG",
                "Shooter",
                "Platformer",
                "Simulation",
                "Strategy",
                "Puzzle",
                "Racing",
                "Sports",
                "Fighting",
                "Stealth",
                "Survival",
                "Horror",
                "Sandbox",
                "Visual Novel",
                "Point-and-Click",
                "MMORPG",
                "Metroidvania",
                "Idle"
            ]),
            platform: faker.helpers.arrayElement(['PC', 'PS5', 'Switch', 'Android', 'Mac']),
            backlogPriority: faker.number.int({ min: 1, max: 5 }),
            hoursPlayed: 0.0,
            timesCompleted: faker.number.int({ min: 0, max: 3 }),
            completionType: faker.helpers.arrayElement(['Main Story', '100%', 'Speedrun']),
            status: faker.helpers.arrayElement(['Completed', 'Not Completed']),
            dateFirstFinished: faker.date.past(),
            rating: faker.number.int({ min: 0, max: 5 }),
            description: faker.lorem.sentence(),
        });

        await game.addTags(faker.helpers.shuffle(tags).slice(0, 2));
    }

    for (let i = 0; i < 100000; i++) {
        const game = await Game.create({
            name: faker.lorem.words(2),
            genre: faker.helpers.arrayElement([
                "Action",
                "Adventure",
                "RPG",
                "Shooter",
                "Platformer",
                "Simulation",
                "Strategy",
                "Puzzle",
                "Racing",
                "Sports",
                "Fighting",
                "Stealth",
                "Survival",
                "Horror",
                "Sandbox",
                "Visual Novel",
                "Point-and-Click",
                "MMORPG",
                "Metroidvania",
                "Idle"
            ]),
            platform: faker.helpers.arrayElement(['PC', 'PS5', 'Switch', 'Android', 'Mac']),
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

gamesSeed();
