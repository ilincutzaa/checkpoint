import Game from './Game.js';
import Tag from './Tag.js';

Game.belongsToMany(Tag, { through: 'GameTags' });
Tag.belongsToMany(Game, { through: 'GameTags' });

// User.belongsToMany(Game, { through: 'UserGames' });
// Game.belongsToMany(User, { through: 'UserGames' });

export { Game, Tag };
