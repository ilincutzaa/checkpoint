import Game from './Game.js';
import Tag from './Tag.js';

Game.belongsToMany(Tag, { through: 'GameTags' });
Tag.belongsToMany(Game, { through: 'GameTags' });

export { Game, Tag };
