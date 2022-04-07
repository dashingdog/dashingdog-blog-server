import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Tag extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      name: this.name
    };
    return origin;
  }
}

Tag.init({
  name: {
    type: Sequelize.STRING(64),
    allowNull: false
  }
}, merge(
  {
    sequelize,
    tableName: 'tag',
    modelName: 'tag'
  },
  InfoCrudMixin.options
));

module.exports = {
  Tag
};