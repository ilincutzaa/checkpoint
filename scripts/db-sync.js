import sequelize from '../lib/sequelize.js';
import gamesSeed from "./games-seed.js";

async function setupNeon() {
    try {
        await sequelize.sync({ force: true });
        console.log('✅ Schema synced');

        await gamesSeed();
        await gamesSeed();
        console.log('✅ Seeds inserted');
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await sequelize.close();
    }
}

setupNeon();

