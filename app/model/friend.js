import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Friend extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      name: this.name,
      link: this.link,
      avatar: this.avatar
    };
    return origin;
  }
}

Friend.init({
  name: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  link: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  }
}, merge(
  {
    sequelize,
    tableName: 'friend',
    modelName: 'friend'
  },
  InfoCrudMixin.options
));

module.exports = {
  Friend
};
